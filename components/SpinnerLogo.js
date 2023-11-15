import {DotLoader} from "react-spinners";

export default function SpinnerLogo({fullWith}) {
    if (fullWith) {
        return (
            <div className="w-full flex justify-center">
                <DotLoader color={'#4F46E5'} speedMultiplier={1} />
            </div>
        );
    }
    return (
        <DotLoader color={'#4F46E5'} speedMultiplier={1} />
    );
}