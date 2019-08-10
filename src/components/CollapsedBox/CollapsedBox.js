import React, { PureComponent } from 'react'
import classNames from 'classnames'
import styles from './styles.css'


class CollapsedBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded,
    }
  }

  handleHeaderClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <div className={classNames(styles.CollapsedBox, {
        [styles.CollapsedBox_expanded]: this.state.expanded
      })}>
        {this.props.title && (
          <header
            onClick={this.handleHeaderClick}
            className={styles.CollapsedBox_header}>
            <span className={styles.CollapsedBox_title}>{this.props.title}</span>
            <span className={styles.CollapsedBox_indicator}>{this.state.expanded ? '-' : '+'}</span>
          </header>
        )}

        <div className={styles.CollapsedBox_content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CollapsedBox;
