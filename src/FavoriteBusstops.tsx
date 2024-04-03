import { Link } from "react-router-dom"

export const FavoriteBusstops = () => {
    return <div className="centered-container">
                <div className="favorites-container">
                    <div className="favorites-list">
                        <Link to={'/busstop/58367'} className="link">
                            <div className="link-container">
                                Bjørvika
                            </div>
                        </Link>
                        <Link to={'/busstop/59516'} className="link">
                            <div className="link-container">
                                Helsfyr
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
}