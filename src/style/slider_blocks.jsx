import React, {useState} from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";

import {Btn_arrow} from "../../inputs/buttons/button_arrow"


export class Slider_blocks extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      max_items_count: 5,
      anim_state: false,
      anim_dir: "dir_left",
      active_block: this.props.default || 1
    };

    this.set_items_count = this.set_items_count.bind(this)
  }

  componentDidMount() {
    this.set_items_count()
    window.addEventListener('resize', this.set_items_count, true )
    window.addEventListener('load', this.set_items_count, {once: true} )

  }

  set_items_count() {
    this.setState({
      max_items_count: window.getComputedStyle(this.container.current,null).getPropertyValue("--items_block_lenght") || 5
    })
  }

  componentWillUnmount() {
    document.getElementById("root").removeEventListener('scroll', this.set_items_count, true )
    window.removeEventListener('load', this.set_items_count, {once: true} )
  }

  animeted_when_visible() {

  }

  render() {

    let items = [], blocks_count = Math.ceil( this.props.items.length / this.state.max_items_count )
    for (let i = 0; i < this.state.max_items_count; i++) {
      let number = this.state.active_block * this.state.max_items_count - this.state.max_items_count + i
      this.props.items[number] && items.push(this.props.items[number])
    }

    return (
      <div ref={this.container} className={"slider-blocks" + " " + this.state.anim_dir}>

        <Btn_arrow
          onClick={()=>{
            this.setState({
              active_block: this.state.active_block - 1 < 1 ? 1 : this.state.active_block - 1,
              anim_state: this.state.active_block - 1 < 1 ? this.state.anim_state : !this.state.anim_state,
              anim_dir: "dir_right"
            });
          }}
          className={this.state.active_block <= 1 ? 'loced' : null}
        />

        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={this.state.anim_state}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="slider-blocks_items">
              {items.length != 0 && items}
            </div>
          </CSSTransition>
        </SwitchTransition>

        <Btn_arrow
          onClick={()=>{
            this.state.active_block + 1 <= blocks_count && this.setState({
              active_block: this.state.active_block + 1,
              anim_state: !this.state.anim_state,
              anim_dir: "dir_left"
            });
          }}
          className={this.state.active_block >= blocks_count ? 'loced' : null}  dir="right"
        />

      </div>
    );
  }
}
