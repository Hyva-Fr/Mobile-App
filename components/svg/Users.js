import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Css from '../../utils/CSS'

function Users(props) {

    const active = props.active !== 'Users' ? Css().root.darkGrey : Css().root.red
    const fill = (props.fill) ? props.fill : active

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path fill={fill} d="M12 20.016q2.484 0 4.523-1.43t2.93-3.68q-1.406-1.125-3.844-1.125-1.359 0-2.883.586t-1.523 1.523v4.078q.281.047.797.047zm-2.391-4.125q0-1.641 1.875-2.672-1.172-.234-1.875-.234-1.266 0-2.859.445t-2.297 1.242q.656 1.781 2.016 3.094t3.141 1.875v-3.75zm0-9.141q-.984 0-1.688.703t-.703 1.688.703 1.664 1.688.68 1.664-.68.68-1.664-.68-1.688-1.664-.703zm6 1.594q-.797 0-1.359.563t-.563 1.359.563 1.359 1.359.563 1.359-.563.563-1.359-.563-1.359-1.359-.563zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055T12 21.986q-4.172 0-7.102-2.93t-2.93-7.055 2.93-7.055T12 2.016z" />
        </Svg>
    )
}

export default Users
