import React, { Component } from 'react'
import openSignInWindow from '../../Login-Popup/openPopup';
import { getUser, sendConnection } from '../../api/mainApi'
//Components
import backgroundArt from '../../resources/backgroundArt.png'
import metaModLogo from '../../resources/metaModLogo.png'

import twitchLogin from '../../resources/twitchLoginBlank.png'
import discordLogin from '../../resources/discordLoginBlank.png'
import twitchSuccess from '../../resources/twitchLoginSuccess.png'
import discordSuccess from '../../resources/discordLoginSuccess.png'
//Styles
import styles from './Connect.module.css'

export class Connect extends Component {

    state = {
        twitchID: '',
        twitchLogin: '',
        discordID: '',
        discordLogin: '',
        discordDiscriminator: '',
        token: '',
        status: ''
    }

    componentDidMount = async () => {
        var apiEndpoint = ''
        if(window.location.origin.includes("localhost")){
            apiEndpoint = 'http://localhost:5000'
        } else {
            apiEndpoint = 'https://api.metamoderation.com'
        }

        //event listener for popup messages with login info
        window.addEventListener("message", async (event)=>{
            console.log(event.data)
            let userData = event.data.split('&')
            if(event.data.includes('twitchID') && !event.data.includes('discordID')){
                this.setState({
                    twitchID: userData[0].substring(10, userData[0].length), 
                    twitchLogin: userData[1].substring(12, userData[1].length)
                })
            } else if(event.data.includes('discordID') && !event.data.includes('twitchID') && !event.data.includes(undefined)){
                console.log(userData, 'userData', userData[0].substring(11, userData[0].length))
                
                this.setState({
                    discordID: userData[0].substring(11, userData[0].length), 
                    discordLogin: userData[1].substring(13, userData[1].length),
                    discordDiscriminator: userData[2].substring(14, userData[2].length),
                    token: userData[3].substring(6, userData[3].length)
                }, async()=>{
                    console.log(this.state)
                    //send data connection to server
                    let connectionStatus = await sendConnection(apiEndpoint, this.state)
                    this.setState({status: connectionStatus.status}, ()=>{console.log(this.state)})
                })
            } else if(event.data.includes('twitchID') && event.data.includes('discordID')){
                this.setState({
                    twitchID: userData[0].substring(10, userData[0].length), 
                    twitchLogin: userData[1].substring(12, userData[1].length),
                    discordID: userData[2].substring(11, userData[2].length), 
                    discordLogin: userData[3].substring(13, userData[3].length),
                    discordDiscriminator: userData[4].substring(14, userData[4].length)
                })
            }
        })
    }

    logUserIn = (type) => {
        let apiEndpoint = ''
        if(window.location.origin.includes("localhost")){
            apiEndpoint = 'http://localhost:5000'
        } else {
            apiEndpoint = 'https://api.metamoderation.com'
        }
        openSignInWindow(apiEndpoint + '/connect/' + type, 'authenticate')
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.background}>
                    <img className={styles.backgroundImage} src={backgroundArt} alt='background'/>
                    <div className={styles.containerContent}>
                        <div className={styles.headerGrid}>
                            <img className={styles.logo} src={metaModLogo}/>
                            <div className={styles.headerMain}>MetaMod</div>
                        </div>
                        <div className={styles.headerSub}>Ranks</div>

                        {this.state.twitchLogin === '' || this.state.discordLogin === '' ?
                            <div className={styles.instruction}>Connect Twitch to Discord to start gaining ranks</div>
                            :
                            <div className={styles.instruction} style={{color: '#90D48B'}}><b>You can now close this tab.</b></div>
                        }

                        {this.state.twitchLogin === '' ? 
                            <button className={styles.twitchLoginButton}
                            onClick={()=>this.logUserIn('twitch')}>
                                <img src={twitchLogin} className={styles.loginImage} alt='login'/>
                            </button>
                            :
                            <button className={styles.twitchLoginButton}>
                                <img src={twitchSuccess} className={styles.loginImage} alt='login'/>
                            </button>
                        }

                        {this.state.discordLogin === '' ? 
                            <button className={styles.discordLoginButton}
                            onClick={()=>{
                                if(this.state.twitchLogin !== ''){
                                    this.logUserIn('discord')
                                }                                    
                                }}>
                                <img src={discordLogin} className={styles.loginImage} style={this.state.twitchLogin === '' ? {display: 'none'} : {display: 'block'}} alt='login'/>
                            </button>
                            :
                            <button className={styles.discordLoginButton}>
                                <img src={discordSuccess} className={styles.loginImage} alt='login'/>
                            </button>
                        }

                        {this.state.twitchLogin !== '' && this.state.discordLogin !== '' ?
                            <div className={styles.bottomInstruction}>You are connected! You can now gain ranks in discord!</div>
                            :
                            null
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Connect