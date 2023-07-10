import './index.css'
import { connect } from 'react-redux'

function Right(props) {
    const list = props.list || []
    console.log('props', props)
    return(
        <div className="right">
            {
                list.map(item => {
                    return(
                        <div key={item.id}>
                            <div>{item.info}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, null)(Right)