import React, {Component, PropTypes} from 'react';
import claw from './claw.svg';

export default class SomeComponent extends Component {
    static propTypes = {};

    render() {
        return (
            <div>{claw}</div>
        );
    }
}
