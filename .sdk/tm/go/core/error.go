package core

type GameDevelopmentError struct {
	IsGameDevelopmentError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGameDevelopmentError(code string, msg string, ctx *Context) *GameDevelopmentError {
	return &GameDevelopmentError{
		IsGameDevelopmentError: true,
		Sdk:              "GameDevelopment",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GameDevelopmentError) Error() string {
	return e.Msg
}
