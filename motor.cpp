// Motor A
#define L_EN_A 5    // GPIO5 (D1)
#define R_EN_A 4    // GPIO4 (D2)
#define L_PWM_A 0   // GPIO0 (D3)
#define R_PWM_A 2   // GPIO2 (D4)

// Motor B
#define L_EN_B 14   // GPIO14 (D5)
#define R_EN_B 12   // GPIO12 (D6)
#define L_PWM_B 13  // GPIO13 (D7)
#define R_PWM_B 15  // GPIO15 (D8)

int speedA = 0;
int speedB = 0;
int maxSpeed = 800;

// Pines de botones
#define BTN_FWD     16  // D0
#define BTN_BWD     5   // D1
#define BTN_LEFT    4   // D2
#define BTN_RIGHT   0   // D3
#define BTN_STOP    2   // D4

void setup() {
  serial.begin(9600);
  // Motor A
  pinMode(L_EN_A, OUTPUT);
  pinMode(R_EN_A, OUTPUT);
  pinMode(L_PWM_A, OUTPUT);
  pinMode(R_PWM_A, OUTPUT);

  // Motor B
  pinMode(L_EN_B, OUTPUT);
  pinMode(R_EN_B, OUTPUT);
  pinMode(L_PWM_B, OUTPUT);
  pinMode(R_PWM_B, OUTPUT);

  digitalWrite(L_EN_A, HIGH);
  digitalWrite(R_EN_A, HIGH);
  digitalWrite(L_EN_B, HIGH);
  digitalWrite(R_EN_B, HIGH);

  // Botones
  pinMode(BTN_FWD, INPUT_PULLUP);
  pinMode(BTN_BWD, INPUT_PULLUP);
  pinMode(BTN_LEFT, INPUT_PULLUP);
  pinMode(BTN_RIGHT, INPUT_PULLUP);
  pinMode(BTN_STOP, INPUT_PULLUP);
}

void loop() {
  server.handleClient();  // Escucha las peticiones HTTP
  if (digitalRead(BTN_FWD) == LOW) {
    setMotorDirection(true, true);
    setSpeed(maxSpeed, maxSpeed);
  } else if (digitalRead(BTN_BWD) == LOW) {
    setMotorDirection(false, false);
    setSpeed(maxSpeed, maxSpeed);
  } else if (digitalRead(BTN_LEFT) == LOW) {
    setMotorDirection(false, true);
    setSpeed(maxSpeed, maxSpeed);
  } else if (digitalRead(BTN_RIGHT) == LOW) {
    setMotorDirection(true, false);
    setSpeed(maxSpeed, maxSpeed);
  } else if (digitalRead(BTN_STOP) == LOW) {
    softStop();
  } else {
    setSpeed(0, 0);
    setMotorDirection(true, true);
  }

  delay(50);  // Anti-rebote básico
}

// --------------------

void setMotorDirection(bool forwardA, bool forwardB) {
  analogWrite(forwardA ? R_PWM_A : L_PWM_A, 0);
  analogWrite(forwardA ? L_PWM_A : R_PWM_A, 0);
  analogWrite(forwardA ? R_PWM_A : L_PWM_A, speedA);

  analogWrite(forwardB ? R_PWM_B : L_PWM_B, 0);
  analogWrite(forwardB ? L_PWM_B : R_PWM_B, 0);
  analogWrite(forwardB ? R_PWM_B : L_PWM_B, speedB);
}

void setSpeed(int a, int b) {
  speedA = constrain(a, 0, 1023);
  speedB = constrain(b, 0, 1023);
}

void softStop() {
  for (int i = speedA; i >= 0; i -= 20) {
    analogWrite(R_PWM_A, 0);
    analogWrite(L_PWM_A, 0);
    analogWrite(R_PWM_B, 0);
    analogWrite(L_PWM_B, 0);
    delay(20);
  }
  speedA = 0;
  speedB = 0;
}