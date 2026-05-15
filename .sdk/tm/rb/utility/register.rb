# GameDevelopment SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GameDevelopmentUtility.registrar = ->(u) {
  u.clean = GameDevelopmentUtilities::Clean
  u.done = GameDevelopmentUtilities::Done
  u.make_error = GameDevelopmentUtilities::MakeError
  u.feature_add = GameDevelopmentUtilities::FeatureAdd
  u.feature_hook = GameDevelopmentUtilities::FeatureHook
  u.feature_init = GameDevelopmentUtilities::FeatureInit
  u.fetcher = GameDevelopmentUtilities::Fetcher
  u.make_fetch_def = GameDevelopmentUtilities::MakeFetchDef
  u.make_context = GameDevelopmentUtilities::MakeContext
  u.make_options = GameDevelopmentUtilities::MakeOptions
  u.make_request = GameDevelopmentUtilities::MakeRequest
  u.make_response = GameDevelopmentUtilities::MakeResponse
  u.make_result = GameDevelopmentUtilities::MakeResult
  u.make_point = GameDevelopmentUtilities::MakePoint
  u.make_spec = GameDevelopmentUtilities::MakeSpec
  u.make_url = GameDevelopmentUtilities::MakeUrl
  u.param = GameDevelopmentUtilities::Param
  u.prepare_auth = GameDevelopmentUtilities::PrepareAuth
  u.prepare_body = GameDevelopmentUtilities::PrepareBody
  u.prepare_headers = GameDevelopmentUtilities::PrepareHeaders
  u.prepare_method = GameDevelopmentUtilities::PrepareMethod
  u.prepare_params = GameDevelopmentUtilities::PrepareParams
  u.prepare_path = GameDevelopmentUtilities::PreparePath
  u.prepare_query = GameDevelopmentUtilities::PrepareQuery
  u.result_basic = GameDevelopmentUtilities::ResultBasic
  u.result_body = GameDevelopmentUtilities::ResultBody
  u.result_headers = GameDevelopmentUtilities::ResultHeaders
  u.transform_request = GameDevelopmentUtilities::TransformRequest
  u.transform_response = GameDevelopmentUtilities::TransformResponse
}
