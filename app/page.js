import Workers from "./components/Workers";
import Navbar from "./components/Navbar";

let businessName = "Best barber Shop";

export default  function Home() {

    return (
        <>
            <Navbar/>
            <div
                className="relative w-full h-screen bg-cover bg-center pt-16 overflow-x-hidden"  // הוספתי overflow-x-hidden כדי למנוע גלילה אופקית
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative flex flex-col items-center justify-start w-full h-full text-center p-4">
                    <h1 className="text-5xl font-bold text-white mb-5 mt-16">Hello there and welcome
                        to {businessName}</h1>
                    <p className="mb-5 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>
            <Workers/>
        </>
    );
}
