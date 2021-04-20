async function doConnect()
{
   // Prompt user to select any serial port.
   const port = await navigator.serial.requestPort();
   await port.open({ baudRate:115200});

   const textDecoder = new TextDecoderStream();
   const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
   const reader = textDecoder.readable.getReader();

   // Listen to data coming from the serial device.
   while (true) {
     const { value, done } = await reader.read();
     if (done) {
       // Allow the serial port to be closed later.
       reader.releaseLock();
       break;
     }
     document.getElementById("terminal").value += value;
     console.log(value);
   }

}

async function doDoDisconnect()
{

}

async function doKeypress()
{
    console.log("click");
}