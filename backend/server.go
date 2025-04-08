package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	// Set trusted proxies to localhost and 127.0.0.1 for development
	server.SetTrustedProxies([]string{"127.0.0.1", "localhost"})

	server.GET("/test", func(c *gin.Context) {
		// context is the request and response
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	})

	server.Run(":8080")
}
