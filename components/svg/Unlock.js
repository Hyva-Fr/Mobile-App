import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Unlock(props) {

    const active = props.active !== 'Unlock' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M8.906 6v1.219L7.078 5.391q.234-1.875 1.617-3.141T12 .984q2.063 0 3.539 1.477T17.016 6v2.016H18q.797 0 1.406.586t.609 1.383v8.344L9.656 8.016h5.438V6q0-1.266-.914-2.18T12 2.906t-2.18.914T8.906 6zM21 21.797l-1.219 1.219-1.125-1.125q-.375.094-.656.094H6q-.797 0-1.406-.586t-.609-1.383V9.985q0-1.172 1.078-1.734L3 6.235l1.219-1.219z" />
        </Svg>
    )
}

export default Unlock
