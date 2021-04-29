import React from 'react'

function alertWrapper(WrappedCom, prevState) {
    return class extends React.Component {
        state = {
            hide: false
        }
        timer = () => {
            this.setState(prevState => {
                return {
                    hide: !prevState.hide
                };
            });
        }
        componentDidMount() {
            this.tick = setTimeout(this.timer, 3000);
        }
        componentWillUnmount() {
            clearTimeout(this.tick)
        }
        render() {
            return (
                !this.state.hide ? <WrappedCom {...prevState} {...this.props} /> : null
            )
        }
    }
}

export default alertWrapper
