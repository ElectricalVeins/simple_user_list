import React from "react"
import PropTypes from "prop-types"
import cx from 'classnames'
import styles from "./UserCard.module.sass"

const UserCard = (props) => {
    const { cell, name, email, login, age, imgSrc, country, city, handleUserSelect, selectedUsers } = props

    const classes = cx(styles.container, {
        [styles.selectedCard]: selectedUsers.filter(selectedUser => selectedUser.cell === cell).length
    })
    const handleClick = () => handleUserSelect({ name, cell })

    return <div className={classes} onClick={handleClick}>
        <div>{name}</div>
        <div>{email}</div>
        <div>{login}</div>
        <div>{age}</div>
        <div>{`${country}, ${city}`}</div>
        <img src={imgSrc} alt="user" />
    </div>
}

UserCard.propTypes = {
    cell: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    login: PropTypes.string,
    age: PropTypes.number,
    imgSrc: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    handleUserSelect: PropTypes.func,
    selectedUsers: PropTypes.array,
}

export default UserCard
