/**
 * Create by fay on 2019-07-18 11:31
 */
import React from 'react';
import '../style/tool.scss';
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-tool';

export default () => {
    return (
        <div className={stylePrefix}>
            <button>锁定</button>
            <button>顶部对齐</button>
            <button>中部对齐</button>
            <button>底部对齐</button>
            <button>左对齐</button>
            <button>文字居中</button>
            <button>右对齐</button>
            <select>
                <option>6</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>20</option>
                <option>22</option>
                <option>24</option>
                <option>26</option>
                <option>28</option>
                <option>36</option>
                <option>48</option>
                <option>72</option>
            </select>
        </div>
    )
}