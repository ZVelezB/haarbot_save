import asyncio
import websockets
import json
import time
import collections

from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds

# Activar logs de BrainFlow
BoardShim.enable_dev_board_logger()

# Configuración del Synthetic Board
params = BrainFlowInputParams()
board = BoardShim(BoardIds.SYNTHETIC_BOARD.value, params)

board.prepare_session()
board.start_stream()

print("✅ BrainFlow Synthetic Board iniciado...")

# Buffer circular para 500 muestras por canal
BUFFER_SIZE = 500
data_buffer = collections.deque(maxlen=BUFFER_SIZE)

async def stream_data(websocket, path):
    while True:
        raw_data = board.get_board_data()

        # Guardar en buffer
        for i in range(raw_data.shape[1]):
            data_buffer.append(raw_data[:, i].tolist())

        # Empaquetar en JSON (últimas 200 muestras)
        latest = list(data_buffer)[-200:]
        msg = {
            "timestamp": time.time(),
            "raw": list(map(list, zip(*latest))),  # reorganiza por canales
            "prediction": "Concentrado (ejemplo uwu)"
        }

        print("Enviando shape:", len(msg["raw"]), "x", len(msg["raw"][0]) if msg["raw"] else 0)
        await websocket.send(json.dumps(msg))
        await asyncio.sleep(1)  # frecuencia de envío

async def main():
    async with websockets.serve(stream_data, "0.0.0.0", 8765):
        print("✅ WebSocket server escuchando en ws://0.0.0.0:8765")
        await asyncio.Future()  # espera infinita

if __name__ == "__main__":
    asyncio.run(main())
