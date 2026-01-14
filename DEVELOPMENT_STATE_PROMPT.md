# Development State Review Prompt Template

Use this prompt to generate a comprehensive development state review for any software project. This template guides you through a systematic review process to document what's completed, partially implemented, missing, or needs review.

## Instructions

1. **Review the codebase systematically** following the sections below
2. **Use the status categories** consistently throughout
3. **Be specific** - cite file paths, component names, and line numbers where relevant
4. **Compare against planned features** - reference architecture docs, README files, or planning documents
5. **Document gaps clearly** - distinguish between missing features and incomplete implementations
6. **Prioritize findings** - identify critical issues vs. nice-to-haves

## Status Categories

Use these status indicators consistently:

- **✅ Completed**: Fully implemented and functional
- **🟡 Partial**: Partially implemented, needs completion
- **❌ Missing**: Not yet implemented
- **⚠️ Needs Review**: Implemented but may have issues or need refinement

## Document Structure

### 1. Header Section

```markdown
# [Project Name] - Development State

**Last Updated:** [Date]
**Version:** [Version Number]

## Overview

[Brief description of the project and the purpose of this review document]
```

### 2. Core Infrastructure Review

**What to review:**
- Project setup and configuration files
- Build system and dependencies
- TypeScript/JavaScript configuration
- Styling setup (CSS frameworks, theme configs)
- Environment configuration
- Package management

**Questions to answer:**
- Are all configuration files present and properly configured?
- Are dependencies up to date and appropriate?
- Is the build system working correctly?
- Are there any missing or misconfigured setup files?

**Documentation format:**
```markdown
### Project Setup and Configuration
**Status: ✅ Completed / 🟡 Partial / ❌ Missing**

- **[Configuration Type]** (`filename.ext`)
  - ✅ Feature/checklist item
  - ⚠️ Issue or concern
  - ❌ Missing item
```

### 3. Authentication & Storage Review

**What to review:**
- Authentication system (if applicable)
- Database/storage setup
- Data persistence layer
- Session management
- Security implementations
- Data migrations

**Questions to answer:**
- Is authentication fully implemented?
- Are storage operations working correctly?
- Is data properly persisted?
- Are migrations handled correctly?
- Is security properly implemented?

### 4. Feature Areas Review

**For each major feature area:**

**What to review:**
- Feature components
- User flows
- Data models
- API endpoints (if applicable)
- Integration points
- Error handling

**Questions to answer:**
- Is the feature fully functional?
- Are all planned sub-features implemented?
- Are edge cases handled?
- Is the user experience complete?
- Are there any known bugs or issues?

**Documentation format:**
```markdown
### [Feature Name]
**Status: ✅ Completed / 🟡 Partial / ❌ Missing**

- **[Component/Sub-feature]**
  - ✅ Implemented feature
  - 🟡 Partial implementation details
  - ❌ Missing feature
  - ⚠️ Issue or concern
```

### 5. UI/UX Components Review

**What to review:**
- All UI components
- Layout components
- Navigation components
- Form components
- Responsive design
- Accessibility
- User interactions

**Questions to answer:**
- Are all components implemented?
- Is the UI responsive?
- Are components reusable?
- Is navigation intuitive?
- Are there accessibility concerns?

### 6. Data Models & Types Review

**What to review:**
- Type definitions
- Data schemas
- API contracts
- Database schemas
- Validation logic

**Questions to answer:**
- Are types properly defined?
- Is type safety maintained?
- Are schemas complete?
- Is validation implemented?

### 7. Utilities & Helpers Review

**What to review:**
- Utility functions
- Helper modules
- Shared logic
- Common services
- Helper components

**Questions to answer:**
- Are utilities complete?
- Is code properly abstracted?
- Are helpers reusable?
- Is there code duplication?

### 8. Page Routes Review

**What to review:**
- All application routes
- Route handlers
- Page components
- Navigation flows
- Route protection

**Questions to answer:**
- Are all routes implemented?
- Is navigation working?
- Are routes properly protected?
- Are error pages handled?

### 9. Integration Points Review

**What to review:**
- Component integrations
- API integrations
- Third-party services
- Data flow between systems
- Event handling

**Questions to answer:**
- Are integrations working correctly?
- Are data flows complete?
- Are error cases handled?
- Are there missing integrations?

### 10. Documentation Review

**What to review:**
- README files
- Setup guides
- API documentation
- Code comments
- Architecture documentation
- User guides

**Questions to answer:**
- Is documentation complete?
- Is it up to date?
- Are setup instructions clear?
- Is code well-commented?

### 11. Known Issues & Gaps

**Document all identified issues:**

**Format:**
```markdown
### Critical Missing Features

1. **[Feature Name]**
   - Description of what's missing
   - Impact on users/functionality
   - **Priority: High/Medium/Low** - Reason

### Technical Debt

1. **[Issue Name]**
   - Description of technical debt
   - Why it's an issue
   - Suggested resolution

### Potential Bugs

1. **[Bug Description]**
   - What the bug is
   - Where it occurs
   - Potential impact
```

### 12. Completion Summary

**Create a summary table:**

```markdown
### Overall Status by Category

| Category | Status | Completion |
|----------|--------|------------|
| Core Infrastructure | ✅/🟡/❌ | XX% |
| [Category Name] | ✅/🟡/❌ | XX% |

### Overall App Completion: ~XX%
```

### 13. Implementation Plans (Optional)

**For major missing features, create detailed implementation plans:**

```markdown
## [Feature Name] Implementation Plan

### Problem Statement
[Describe the problem or missing feature]

### Solution Overview
[Describe the proposed solution]

### Implementation Strategy
[Break down the approach]

### Implementation Steps
1. Step 1
2. Step 2
3. etc.

### Technical Details
[Code examples, architecture decisions, etc.]

### Files to Modify
- File path 1
- File path 2

### Files to Create
- New file path 1
- New file path 2

### Success Criteria
- ✅ Criterion 1
- ✅ Criterion 2

### Priority
**High/Medium/Low Priority** - Reason

### Estimated Effort
[Time estimate]
```

### 14. Priority Recommendations

**Organize recommendations by priority:**

```markdown
### High Priority (Critical Issues)

1. **[Issue/Feature Name]**
   - Description
   - Why it's high priority
   - Suggested approach

### Medium Priority (Important Features)

1. **[Issue/Feature Name]**
   - Description
   - Why it's medium priority

### Low Priority (Enhancements)

1. **[Issue/Feature Name]**
   - Description
   - Why it's low priority
```

### 15. Next Steps

**Provide actionable next steps:**

```markdown
### Immediate Actions

1. [Action item 1]
2. [Action item 2]

### Short-term Goals

1. [Goal 1]
2. [Goal 2]

### Long-term Enhancements

1. [Enhancement 1]
2. [Enhancement 2]
```

## Review Methodology

### Step 1: Preparation
- Read project README and documentation
- Review architecture/planning documents
- Understand project goals and scope
- Identify key features and components

### Step 2: File-by-File Analysis
- Review all source files systematically
- Check component implementations
- Verify utility functions
- Review data models and types
- Check configuration files

### Step 3: Integration Testing
- Check how components work together
- Verify data flows
- Test user journeys
- Check error handling

### Step 4: Code Quality Assessment
- Look for TODOs and FIXMEs
- Check for incomplete patterns
- Identify technical debt
- Note potential bugs

### Step 5: Feature Completeness
- Compare implementation to planned features
- Identify missing features
- Note partial implementations
- Document gaps

### Step 6: Documentation Quality
- Assess documentation completeness
- Check code comments
- Verify setup instructions
- Review API documentation

## Review Checklist

Use this checklist to ensure comprehensive coverage:

### Infrastructure
- [ ] Project configuration files
- [ ] Build system
- [ ] Dependencies
- [ ] Environment setup
- [ ] TypeScript/JavaScript config

### Authentication & Storage
- [ ] Auth system (if applicable)
- [ ] Database/storage setup
- [ ] Data persistence
- [ ] Migrations
- [ ] Security

### Features
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
- [ ] ... (list all major features)

### UI/UX
- [ ] All pages/routes
- [ ] Components
- [ ] Navigation
- [ ] Responsive design
- [ ] Accessibility

### Data & Types
- [ ] Type definitions
- [ ] Data models
- [ ] Schemas
- [ ] Validation

### Utilities
- [ ] Helper functions
- [ ] Shared utilities
- [ ] Common services

### Integration
- [ ] Component integrations
- [ ] API integrations
- [ ] Third-party services
- [ ] Data flows

### Documentation
- [ ] README files
- [ ] Setup guides
- [ ] Code comments
- [ ] Architecture docs

## Writing Guidelines

### Be Specific
- Use file paths: `src/components/Example.tsx`
- Reference line numbers when relevant
- Cite specific functions or components
- Mention specific features or behaviors

### Be Objective
- Focus on facts, not opinions
- Distinguish between missing features and bugs
- Note what works vs. what doesn't
- Avoid subjective language

### Be Actionable
- Provide clear next steps
- Prioritize issues appropriately
- Suggest solutions where possible
- Include implementation details for major gaps

### Be Comprehensive
- Cover all major areas
- Don't skip sections
- Document both positives and gaps
- Include both high-level and detailed findings

## Example Prompts for AI/LLM Assistance

If using AI to help generate the review, use prompts like:

```
Review the [Project Name] codebase and create a comprehensive development state document. 

Focus on:
1. Core infrastructure setup
2. Feature completeness
3. UI/UX components
4. Data models and types
5. Integration points
6. Known issues and gaps

For each area, identify:
- What's completed (✅)
- What's partial (🟡)
- What's missing (❌)
- What needs review (⚠️)

Compare the implementation against the planned features in [planning document].
Document all findings with specific file paths and component names.
Create priority recommendations for next steps.
```

## Template Usage

1. **Copy this template** for your project
2. **Fill in project-specific sections** (feature names, component lists, etc.)
3. **Follow the review methodology** systematically
4. **Use the status categories** consistently
5. **Update regularly** as development progresses

## Notes

- This document should be a living document, updated as development progresses
- Focus on actionable findings rather than just listing everything
- Balance detail with readability
- Include both high-level summaries and specific details
- Prioritize critical issues that block functionality or user experience

---

**Template Version:** 1.0  
**Last Updated:** 2024-12-19
