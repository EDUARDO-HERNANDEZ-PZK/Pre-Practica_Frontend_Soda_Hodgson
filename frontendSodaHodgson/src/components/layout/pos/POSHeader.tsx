import {
    ShoppingCart,
    CalendarDays,
    Clock3,
} from "lucide-react";

export default function POSHeader() {

    const now = new Date();

    return (

        <div
            className="
            rounded-[30px]
            bg-gradient-to-r
            from-slate-900
            via-slate-800
            to-cyan-800
            text-white
            p-8
            shadow-2xl
            relative
            overflow-hidden
            "
        >

            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl"/>

            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"/>

            <div className="relative z-10 flex justify-between items-center flex-wrap gap-6">

                <div>

                    <div className="flex items-center gap-4">

                        <ShoppingCart
                            size={40}
                            className="text-cyan-300"
                        />

                        <div>

                            <h1 className="text-5xl font-black">

                                Punto de Venta

                            </h1>

                            <p className="text-cyan-300 text-xl mt-2">

                                Realiza ventas rápidas y administra pedidos.

                            </p>

                        </div>

                    </div>

                </div>

                <div
                    className="
                    bg-white/10
                    backdrop-blur-xl
                    rounded-3xl
                    border
                    border-white/20
                    px-6
                    py-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <CalendarDays size={22}/>

                        <span>

                            {now.toLocaleDateString("es-NI",{
                                weekday:"long",
                                year:"numeric",
                                month:"long",
                                day:"numeric"
                            })}

                        </span>

                    </div>

                    <div className="flex items-center gap-3 mt-4">

                        <Clock3 size={22}/>

                        <span className="text-2xl font-bold">

                            {now.toLocaleTimeString("es-NI")}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}