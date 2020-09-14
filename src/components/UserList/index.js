import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styles from "./UserList.module.sass"
import UserCard from "../UserCard"

const UserList = (props) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const [users, setUsers] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchUsers()
        return () => {
            setUsers([])
        }
    }, [])

    const fetchUsers = () => {
        setIsFetching(true)
        fetch("https://randomuser.me/api/?results=25")
            .then((res) => res.json())
            .then((data) => {
                const { results } = data
                setUsers(results)
                setIsFetching(false)
            })
    }

    const handleUserSelect = (newUser) => {
        const foundUsers = selectedUsers.filter(user => user.cell === newUser.cell)
        if (foundUsers.length) {
            const [userToRemove] = foundUsers
            setSelectedUsers(selectedUsers.filter(user => user.cell !== userToRemove.cell))
            return
        }
        setSelectedUsers([...selectedUsers, newUser])
    };

    const renderUsers = () => {
        return users.map((user) => {
            const {
                name: { first, last },
                email,
                cell,
                location: { country, city },
                login: { username },
                dob: { age },
                picture: { large },
            } = user

            return (
                <UserCard
                    key={cell}
                    selectedUsers={selectedUsers}
                    cell={cell}
                    name={`${first} ${last}`}
                    email={email}
                    country={country}
                    city={city}
                    login={username}
                    age={age}
                    imgSrc={large}
                    handleUserSelect={handleUserSelect}
                />
            )
        })
    }

    const renderSelected = () => {
        const names=selectedUsers.map(user=>user.name)
        return names.join(', ')
    }

    return (
        <div className={styles.container}>
            <div className={styles.selectedUsers}>
                {
                    renderSelected()
                }
            </div>
            {
                isFetching
                    ? "Loading..."
                    : users && renderUsers()
            }
        </div>
    )
}

UserList.propTypes = {}

export default UserList
