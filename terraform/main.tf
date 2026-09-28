terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.0"
    }
  }
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

# -------------------------------------------------------------------
# Tenant settings
# -------------------------------------------------------------------
resource "auth0_tenant" "tenant" {
  friendly_name = var.app_name
  support_email = var.support_email

  flags {
    enable_public_signup_user_exists_error = true
  }
}

# -------------------------------------------------------------------
# Web application (SPA)
# -------------------------------------------------------------------
resource "auth0_client" "web_app" {
  name     = "${var.app_name} Web"
  app_type = "spa"

  callbacks           = ["${var.web_app_url}/callback"]
  allowed_logout_urls = ["${var.web_app_url}/login"]
  web_origins         = ["${var.web_app_url}"]

  cross_origin_auth = true

  grant_types = ["authorization_code", "implicit", "refresh_token"]

  jwt_configuration {
    alg = "RS256"
  }
}

# -------------------------------------------------------------------
# Username/password database connection
# -------------------------------------------------------------------
resource "auth0_connection" "database" {
  name     = "${var.app_name}-db"
  strategy = "auth0"

  options {
    password_policy        = "good"
    brute_force_protection = true
    requires_username      = false
  }
}

resource "auth0_connection_clients" "database_clients" {
  connection_id   = auth0_connection.database.id
  enabled_clients = [auth0_client.web_app.client_id, auth0_client.mobile_app.client_id]
}

# -------------------------------------------------------------------
# Mobile application (native)
# -------------------------------------------------------------------
resource "auth0_client" "mobile_app" {
  name     = "${var.app_name} Mobile"
  app_type = "native"

  callbacks           = ["${var.mobile_app_scheme}://callback"]
  allowed_logout_urls = ["${var.mobile_app_scheme}://logout"]

  grant_types = ["authorization_code", "implicit", "refresh_token"]

  jwt_configuration {
    alg = "RS256"
  }
}

# -------------------------------------------------------------------
# MFA — require for all sign-ins (TOTP authenticator app + email OTP)
# -------------------------------------------------------------------
resource "auth0_guardian" "mfa_policy" {
  policy = "all-applications"
  email  = true
  otp = true
}