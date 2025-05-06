"use client";
export default function SmallLogo() {
    return (
        <div className="flex flex-col items-center mt-5">
            <div className={`flex flex-col items-center transition-all duration-300`}>
                <h2 className="text-white font-roboto text-2xl font-semibold opacity-90 mb-2">
                    Clarity.
                </h2>
                <div className="opacity-80 -mt-4 md:-mt-5 transition-all duration-300">
                    <svg width="400" height="40" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10,100 Q30,50 50,100 T90,100 T130,100 T170,100 T210,100 T250,100" stroke="white" fill="transparent" strokeWidth="2" />
                        <path d="M10,110 Q30,70 50,110 T90,110 T130,110 T170,110 T210,110 T250,110" stroke="white" fill="transparent" strokeWidth="2" />
                        <path d="M10,90 Q30,40 50,90 T90,90 T130,90 T170,90 T210,90 T250,90" stroke="white" fill="transparent" strokeWidth="2" />
                        <line x1="250" y1="90" x2="300" y2="95" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="100" x2="300" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="110" x2="300" y2="105" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="300" y1="100" x2="490" y2="100" stroke="white" strokeWidth="3" />
                    </svg>
                </div>
            </div>

        </div>
    );
}
