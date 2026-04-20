package auth

import (
	"strings"
	"unicode"

	"golang.org/x/crypto/bcrypt"
)

const bcryptCost = 12

var (
	ErrPasswordTooShort      = "密码长度至少8位"
	ErrPasswordNeedUpperCase = "密码必须包含大写字母"
	ErrPasswordNeedLowerCase = "密码必须包含小写字母"
	ErrPasswordNeedDigit     = "密码必须包含数字"
	ErrPasswordNeedSpecial   = "密码必须包含特殊字符"
	ErrPasswordTooSimple     = "密码必须包含至少2种以上字符类型（大写字母、小写字母、数字、特殊字符）"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func ValidatePasswordComplexity(password string) (bool, string) {
	if len(password) < 8 {
		return false, ErrPasswordTooShort
	}

	var hasUpper, hasLower, hasDigit, hasSpecial bool
	for _, c := range password {
		switch {
		case unicode.IsUpper(c):
			hasUpper = true
		case unicode.IsLower(c):
			hasLower = true
		case unicode.IsDigit(c):
			hasDigit = true
		case unicode.IsPunct(c) || unicode.IsSymbol(c):
			hasSpecial = true
		}
	}

	count := 0
	if hasUpper {
		count++
	}
	if hasLower {
		count++
	}
	if hasDigit {
		count++
	}
	if hasSpecial {
		count++
	}

	if count < 2 {
		return false, ErrPasswordTooSimple
	}

	return true, ""
}

func SanitizePassword(password string) string {
	return strings.TrimSpace(password)
}
