import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>        
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <main className="main">{children}</main>
          <footer style={{
            textAlign: "center",
            padding: "10px 0"
          }}>
            © {new Date().getFullYear()}, Criado por
            {` `}
            <a style={{
              color: "white", 
              textDecoration: "none", 
              fontWeight: "bold"
            }} href="https://rafaelquintanilha.com">Rafael Quintanilha</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
