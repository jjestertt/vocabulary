import './Preloader.css';

export default function Preloader() {
    return (
        <div className="cssload-cssload-wrap2">
            <div className="cssload-wrap">
                <div className="cssload-overlay"></div>

                <div className="cssload-cogWheel cssload-one">
                    <div className="cssload-cog cssload-one"></div>
                    <div className="cssload-cog cssload-two"></div>
                    <div className="cssload-cog cssload-three"></div>
                    <div className="cssload-cog cssload-four"></div>
                    <div className="cssload-cog cssload-five"></div>
                    <div className="cssload-center"></div>
                </div>

                <div className="cssload-cogWheel cssload-two">
                    <div className="cssload-cog cssload-one"></div>
                    <div className="cssload-cog cssload-two"></div>
                    <div className="cssload-cog cssload-three"></div>
                    <div className="cssload-cog cssload-four"></div>
                    <div className="cssload-cog cssload-five"></div>
                    <div className="cssload-center"></div>
                </div>
            </div>
        </div>
    )
}
