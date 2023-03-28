export abstract class ErrorLogger {
  static log(err: any) {
    if (typeof err === "object") {
      if (err.message) {
        console.log("\nMessage: " + err.message);
      }
      if (err.stack) {
        console.log("\nStacktrace:");
        console.log("====================");
        console.log(err.stack);
      }
    } else {
      console.log("dumpError :: argument is not an object");
    }
  }
}
