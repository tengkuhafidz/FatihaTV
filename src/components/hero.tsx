import React from 'react'

interface Props {
    title?: string,
    secondTitle?: string,
    subtext?: string,
}

const Hero: React.FC<Props> = ({ 
        title = "Watch local Islamic content", 
        secondTitle = "from the comfort of your home.", 
        subtext = "Our local asatizah have been hard at work in producing online contents to ensure that we can continue to seek religious knowledge in this uncertain time. We curate them here to support their efforts."
    }) => (
        <div className="max-w-xs md:max-w-2xl mx-auto md:text-center pt-8 py-16">
            <h1 className="font-sans md:font-light md:tracking-wider text-2xl md:text-5xl text-gray-800 leading-tight">
               { title } &nbsp;
                <span className="font-normal text-teal-500 tracking-normal">
                    { secondTitle }
                </span>
            </h1>
            <p className="text-xl text-gray-600 font-light mt-4">
                { subtext }
            </p>
        </div>
    )

export default Hero