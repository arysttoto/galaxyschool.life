import CountdownTimer from "../galaxy-life/countDown";

function StudentCouncil() {
    return (
        <>
        <div className="text-center my-32 mx-5">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">We are <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">almost</span> there!</h1>
            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Galaxy Life is planned to be introduced on October 1! </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 lg:mt-20">
                <CountdownTimer date={"2023-10-01T00:00:00"}/> 
            </div>
        </div>
        </>
    ); 
}
export default StudentCouncil; 