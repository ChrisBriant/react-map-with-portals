import { useContext } from "react";
import { Context as DataContext} from '../context/DataContext';

const Overlay = () => {
    const { state: {overlayComponent}} = useContext(DataContext);

    return (
        <div className="overlay">
            { overlayComponent 
                ? <>
                    { overlayComponent }
                </> 
                : null}
        </div>
    )
}

export default Overlay;