import { Main } from "../../main";

const main = new Main("chatrix-popup");
main.start().catch((error) => {
    throw new Error("Failed to start app: " + error);
});
