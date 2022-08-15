import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Forms(props) {

    const active = props.active !== 'Forms' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M17.016 9V6.984H6.985V9h10.031zm0 3.984v-1.969H6.985v1.969h10.031zm-3 4.032V15H6.985v2.016h7.031zM12 3q-.422 0-.703.281t-.281.703.281.727.703.305.703-.305.281-.727-.281-.703T12 3zm6.984 0q.797 0 1.406.609t.609 1.406v13.969q0 .797-.609 1.406t-1.406.609H5.015q-.797 0-1.406-.609T3 18.984V5.015q0-.797.609-1.406T5.015 3h4.172q.328-.891 1.078-1.453t1.734-.563 1.734.563T14.811 3h4.172z" />
        </Svg>
    )
}

export default Forms
