# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-07-27

### Added

- **Configuration Options:** Users can now customize the extension via `settings.json`.
  - Setting to enable/disable format-on-save (`classtrim.formatOnSave`).
  - Setting to customize target languages (`classtrim.targetLanguages`).
  - Setting to define the required directory (`classtrim.requiredPathSegment`).
- **Duplicate Class Removal:** The formatter now automatically removes any duplicate class names.
- **Output Channel:** Added a dedicated "ClassTrim" output channel for logging and troubleshooting.

### Changed

- **Expanded Support:** The extension now supports the standard `class` attribute, making it compatible with HTML, Vue, and Svelte files by default.
- **Optimized Activation:** Added `activationEvents` to `package.json` to improve performance and ensure the extension only loads when needed.

## [1.0.0] - YYYY-MM-DD

### Added

- Initial release of ClassTrim.
- Automatic trimming of extra whitespace in `className` attributes on save.
- Support for `.jsx` and `.tsx` files within `src` directories.
