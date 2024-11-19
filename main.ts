wappsto.onStringEvent(16, function (receivedString) {
    if (receivedString == "on") {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    basic.showString("" + (receivedString))
})
let distancia_aigua = 0
let humitatTerra = pins.analogReadPin(AnalogReadWritePin.P1)
let strip = neopixel.create(DigitalPin.P16, 30, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.White))
wappsto.configureWifi("iPhone Higini", "Enginyer11")
wappsto.configureName("Cuidem les plantes")
wappsto.configureValue(1, "Temperatura", WappstoValueTemplate.Temperature)
wappsto.configureValue(2, "Humitat Terra", WappstoValueTemplate.Number)
wappsto.configureValue(3, "Distància a l'aigua", WappstoValueTemplate.Number)
wappsto.configureValue(4, "Llum", WappstoValueTemplate.Light)
// per enviar missatges a la wappstobit
wappsto.configureStringValue(16, "Text", "Missatge")
basic.forever(function () {
    distancia_aigua = sonar.ping(
    DigitalPin.P12,
    DigitalPin.P13,
    PingUnit.Centimeters
    )
    humitatTerra = pins.analogReadPin(AnalogReadWritePin.P1)
    wappsto.sendNumberToWappsto(input.temperature(), 1, WappstoTransmit.ASAP)
    wappsto.sendNumberToWappsto(humitatTerra, 2, WappstoTransmit.ASAP)
    wappsto.sendNumberToWappsto(distancia_aigua, 3, WappstoTransmit.ASAP)
    wappsto.sendNumberToWappsto(input.lightLevel(), 4, WappstoTransmit.ASAP)
    if (humitatTerra >= 130 && humitatTerra <= 300) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        pins.digitalWritePin(DigitalPin.P0, 0)
    } else if (humitatTerra < 130) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    if (distancia_aigua > 8) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        music.play(music.stringPlayable("C5 G C5 G C5 G C5 G ", 250), music.PlaybackMode.UntilDone)
    }
})
