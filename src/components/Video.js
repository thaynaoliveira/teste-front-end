import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideoById } from '../Actions';

class Video extends Component {

    componentWillMount(){
        if (this.props.routeParams.id) {
            let { dispatch } = this.props;
            //dispatch(getVideoById(this.props.routeParams.id));
        }
    }

    render() {
        console.log(this.props.video)
        return (
            <div className="video">
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        video: state.video
    };
}

export default connect(mapStateToProps)(Video);