import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    // If theres a alert in the array them return the map
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => {
            return (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    <i className="fas fa-info-circle"></i> {alert.msg}
                </div>
            )    
        })
    )
}

export default Alerts
