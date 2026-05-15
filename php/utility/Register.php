<?php
declare(strict_types=1);

// GameDevelopment SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GameDevelopmentUtility::setRegistrar(function (GameDevelopmentUtility $u): void {
    $u->clean = [GameDevelopmentClean::class, 'call'];
    $u->done = [GameDevelopmentDone::class, 'call'];
    $u->make_error = [GameDevelopmentMakeError::class, 'call'];
    $u->feature_add = [GameDevelopmentFeatureAdd::class, 'call'];
    $u->feature_hook = [GameDevelopmentFeatureHook::class, 'call'];
    $u->feature_init = [GameDevelopmentFeatureInit::class, 'call'];
    $u->fetcher = [GameDevelopmentFetcher::class, 'call'];
    $u->make_fetch_def = [GameDevelopmentMakeFetchDef::class, 'call'];
    $u->make_context = [GameDevelopmentMakeContext::class, 'call'];
    $u->make_options = [GameDevelopmentMakeOptions::class, 'call'];
    $u->make_request = [GameDevelopmentMakeRequest::class, 'call'];
    $u->make_response = [GameDevelopmentMakeResponse::class, 'call'];
    $u->make_result = [GameDevelopmentMakeResult::class, 'call'];
    $u->make_point = [GameDevelopmentMakePoint::class, 'call'];
    $u->make_spec = [GameDevelopmentMakeSpec::class, 'call'];
    $u->make_url = [GameDevelopmentMakeUrl::class, 'call'];
    $u->param = [GameDevelopmentParam::class, 'call'];
    $u->prepare_auth = [GameDevelopmentPrepareAuth::class, 'call'];
    $u->prepare_body = [GameDevelopmentPrepareBody::class, 'call'];
    $u->prepare_headers = [GameDevelopmentPrepareHeaders::class, 'call'];
    $u->prepare_method = [GameDevelopmentPrepareMethod::class, 'call'];
    $u->prepare_params = [GameDevelopmentPrepareParams::class, 'call'];
    $u->prepare_path = [GameDevelopmentPreparePath::class, 'call'];
    $u->prepare_query = [GameDevelopmentPrepareQuery::class, 'call'];
    $u->result_basic = [GameDevelopmentResultBasic::class, 'call'];
    $u->result_body = [GameDevelopmentResultBody::class, 'call'];
    $u->result_headers = [GameDevelopmentResultHeaders::class, 'call'];
    $u->transform_request = [GameDevelopmentTransformRequest::class, 'call'];
    $u->transform_response = [GameDevelopmentTransformResponse::class, 'call'];
});
