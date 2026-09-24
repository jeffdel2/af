output "web_app_client_id" {
  description = "Auth0 Client ID for the web application"
  value       = auth0_client.web_app.client_id
}

output "auth0_domain" {
  description = "Auth0 tenant domain"
  value       = var.auth0_domain
}

output "mobile_app_client_id" {
  description = "Auth0 Client ID for the mobile application"
  value       = auth0_client.mobile_app.client_id
}

output "database_connection_name" {
  description = "Name of the Auth0 database connection"
  value       = auth0_connection.database.name
}
