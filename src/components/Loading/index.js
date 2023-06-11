import loading from '../../assets/loading.svg'
import "../../styles/Loading.css"

const Loading = () => (
    <div width="100%" className="loading">
        <img width="100%" src={loading} alt="loading"/>
    </div>
)

export default Loading;