import React, { Component } from 'react';
import Image from 'next/image';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false
    };
    this.DisplayDrawer = this.DisplayDrawer.bind(this);
  }

  DisplayDrawer() {
    console.log(this.state.displayDrawer)
    this.setState((prevState) => {
      return {displayDrawer: !prevState.displayDrawer}
    });
  }

  render() {    
    return (
      <nav className="flex fixed w-full items-center justify-between px-6 h-20 bg-white text-gray-700 border-b border-gray-200 z-10">
        <div className="flex items-center">
          <button className="mr-2" aria-label="Open Menu" onClick={this.DisplayDrawer}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="w-24" />
          <span>OCTOBOARD</span>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block md:flex md:justify-between md:bg-transparent">
            <button
              title="Wishlist"
              className="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded  hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <span>New Widget</span>
            </button>
            <button
              className="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded  hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
            <button
              className="flex items-cente p-3 font-medium mr-2 text-center bg-gray-300 rounded  hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <aside className={this.state.displayDrawer ? "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" : "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 -translate-x-full"} >
          <span
            onClick={this.DisplayDrawer}
            className="flex w-full items-center p-2 border-b"
          >
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="w-24 h-20" />
            <span> OCTOBOARD</span>
          </span>
          <span
            onClick={this.DisplayDrawer}
            className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
            ><span className="mr-2">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </span>
            <span>Home</span></span
          >
          <span
            onClick={this.DisplayDrawer}
            className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
            ><span className="mr-2">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </span>
            <span>Trending Globally</span></span
          >
          <span
            onClick={this.DisplayDrawer}
            className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
            ><span className="mr-2">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            </span>
            <span>Wishlist</span></span
          >
          <span
            onClick={this.DisplayDrawer}
            className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
            ><span className="mr-2">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </span>
            <span>About</span></span
          >
          <span
            onClick={this.DisplayDrawer}
            className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
            ><span className="mr-2">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </span>
            <span>Contact</span></span
          >
          <div className="fixed bottom-0 w-full">
            <button
              className="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6 mr-2"
              >
                <path
                  fill="none" d="M13.53,2.238c-0.389-0.164-0.844,0.017-1.01,0.41c-0.166,0.391,0.018,0.845,0.411,1.01
								c2.792,1.181,4.598,3.904,4.6,6.937c0,4.152-3.378,7.529-7.53,7.529c-4.151,0-7.529-3.377-7.529-7.529
								C2.469,7.591,4.251,4.878,7.01,3.683C7.401,3.515,7.58,3.06,7.412,2.67c-0.17-0.392-0.624-0.571-1.014-0.402
								c-3.325,1.44-5.472,4.708-5.47,8.327c0,5.002,4.069,9.071,9.071,9.071c5.003,0,9.073-4.07,9.073-9.071
								C19.07,6.939,16.895,3.659,13.53,2.238z"
                ></path>
                <path fill="none" d="M9.999,7.616c0.426,0,0.771-0.345,0.771-0.771v-5.74c0-0.426-0.345-0.771-0.771-0.771
								c-0.427,0-0.771,0.345-0.771,0.771v5.74C9.228,7.271,9.573,7.616,9.999,7.616z"></path>
              </svg>
              <span>LOG OUT</span>
            </button>
          </div>
        </aside>
      </nav>
    )
  }
}