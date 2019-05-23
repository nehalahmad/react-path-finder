import React from 'react';
import maps from "../../services/googleMap";

export default class GoogleMapTextBox extends React.Component {
    state = { value: "" };
    
    componentDidMount() {
        this._autoComplete();
    }

    setValue = value => {
        this.setState({ value })
    }

    getValue = () => {
        this.setState({ value: this.refs.formInput.value });
        return this.refs.formInput.value;
    }

    _autoComplete = async () => {
        const maps = await this.props.maps();
        new maps.places.Autocomplete(this.refs.formInput);
    };

    render() {
        const { title } = this.props;
        
        return (
            <div className="form-group">
                <label>{title}</label>
                <input type="text" ref="formInput" value={this.state.value} className="form-control" required 
                    onChange={e => this.setState({ value: e.target.value })} />
                {this.state.value && <span className="col-lg-1 cross-btn" onClick={() => {this.setState({ value: "" })}}>X</span>}
            </div>
        );
    }
}

GoogleMapTextBox.defaultProps = {
    maps
}