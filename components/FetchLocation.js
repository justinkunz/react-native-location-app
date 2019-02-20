import React from 'react';
import {Button} from 'react-native';

class FetchLocation extends React.Component {
    render() {
        return (
            <Button title="Get Location" onPress={() =>this.props.onGetLocation()} />
        );
    };
};

export default FetchLocation;