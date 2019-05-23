import React from 'react';
import maps from "../../service/googleMap";

export default class GoogleMapTextBox extends React.Component {
    state = { value: "" };
    
    componentDidMount() {
        this.autoComplete();
    }

    setValue = (value) => {
        this.setState({ value })
    }

    getValue = () => {
        this.setState({ value: this.refs.formInput.value })
        return this.refs.formInput.value;
    }

    autoComplete = async () => {
        const maps = await this.props.maps();
        new maps.places.Autocomplete(this.refs.formInput);
    };

    render() {
        const { title } = this.props;
        
        return (
            <div className="form-group">
                <label>{title}</label>
                <input type="text" ref="formInput" value={this.state.value} onChange={(e) => {
                    this.setState({ value: e.target.value })}} className="form-control" required />
                {
                    this.state.value && 
                        <span className="col-lg-1 cross-btn" onClick={() => {this.setState({ value: "" })}}>x</span>
                }
            </div>
        );
    }
}

GoogleMapTextBox.defaultProps = {
    maps
}