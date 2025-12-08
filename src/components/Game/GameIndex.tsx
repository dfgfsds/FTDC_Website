import { useState } from "react";
import StartGame from "./StartGame";
import bg from '../../assets/img/game/map1 copy.png'

function GameIndex() {
    const [started, setStarted] = useState(false);

    return (
        <>
            {!started ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <div
                        className="flex flex-col items-center justify-center bg-cover bg-center rounded-lg"
                        style={{
                            backgroundImage: `url(${bg})`,
                            width: "850%",
                            height: "600px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0.9,
                        }}
                    >
                        <button
                            onClick={() => setStarted(true)}
                            className="btn btn-lg btn-primary rounded-12"
                        >
                            Start Game
                        </button>
                    </div>
                </div>

            ) : (<StartGame />
            )}
        </>
    );
};

export default GameIndex;
