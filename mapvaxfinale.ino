#include <WiFi.h> 
#include <HTTPClient.h> 
#include <WiFiClient.h>
#include <Arduino_JSON.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;
float temperatura;

const char* ssid = "MAEVE_2G";
const char* senha = "gurrb24278";

String serverName = "http://192.168.0.27:8000/todos";


String getTemperature() {
  temperatura = bme.readTemperature();
  String medida = String(temperatura);
  return medida;
}

void setup() {
  pinMode(15,OUTPUT);
  Serial.begin(115200);
  bme.begin(0x76);
  WiFi.begin(ssid, senha);
  Serial.println("Conectando");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado na rede de endereço IP: ");
  Serial.println(WiFi.localIP());
}



void loop() {
  delay(10000);
  if(WiFi.status()== WL_CONNECTED){
      Serial.println("Preparando envio de dados...");
      WiFiClient client;
      HTTPClient http;
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("{\"temperatura\":\"" + getTemperature() + "\", \"sensor\": \"real\"}");
      digitalWrite(15,HIGH);
      delay(400);
      digitalWrite(15,LOW);
      delay(400);
  }
  }
