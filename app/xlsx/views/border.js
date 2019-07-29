/**
 * Create by fay on 2019-07-17 10:27
 */
import React from 'react';
import '../style/border.scss';
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-border';
import classnames from 'classnames';

export default (props) => {

    const onMouseMove = (e) => {
        console.log(e);
        console.log(e.clientX);
    };

    return (
        <span {...props} className={classnames(stylePrefix, stylePrefix+'-'+props.type)} onMouseMove={onMouseMove}/>
    )
}