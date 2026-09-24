variable "auth0_domain" {
  description = "Your Auth0 tenant domain (e.g. dev-abc123.us.auth0.com)"
  type        = string
}

variable "auth0_client_id" {
  description = "Client ID of the Auth0 Machine-to-Machine app used by Terraform"
  type        = string
}

variable "auth0_client_secret" {
  description = "Client secret of the Auth0 Machine-to-Machine app used by Terraform"
  type        = string
  sensitive   = true
}

variable "app_name" {
  description = "Display name for the application"
  type        = string
  default     = "My App"
}

variable "support_email" {
  description = "Support email shown on Auth0 error pages"
  type        = string
  default     = "support@example.com"
}

variable "web_app_url" {
  description = "Base URL of the web app (e.g. http://localhost:3000 for local dev)"
  type        = string
  default     = "http://localhost:3000"
}

variable "mobile_app_scheme" {
  description = "Custom URL scheme for the mobile app (e.g. myapp)"
  type        = string
  default     = "myapp"
}
