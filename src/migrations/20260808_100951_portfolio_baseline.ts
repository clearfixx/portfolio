import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_external_provider" AS ENUM('instagram');
  CREATE TYPE "public"."enum_categories_type" AS ENUM('project', 'blog', 'tech-stack', 'shared');
  CREATE TYPE "public"."enum_projects_highlights_icon" AS ENUM('community', 'research', 'ai', 'media', 'security', 'modules');
  CREATE TYPE "public"."enum_projects_architecture_icon" AS ENUM('frontend', 'api', 'services', 'database');
  CREATE TYPE "public"."enum_projects_roadmap_status" AS ENUM('completed', 'current', 'planned');
  CREATE TYPE "public"."enum_projects_gallery_device_frame" AS ENUM('none', 'desktop', 'laptop', 'tablet', 'mobile');
  CREATE TYPE "public"."enum_projects_links_type" AS ENUM('github', 'live', 'documentation', 'case-study', 'figma', 'other');
  CREATE TYPE "public"."enum_projects_case_study_code_language" AS ENUM('typescript', 'javascript', 'tsx', 'jsx', 'json', 'scss', 'shell', 'other');
  CREATE TYPE "public"."enum_projects_stage" AS ENUM('idea', 'planning', 'development', 'testing', 'released', 'maintenance', 'archived');
  CREATE TYPE "public"."enum_blog_posts_difficulty" AS ENUM('foundation', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_blog_feedback_votes_vote" AS ENUM('helpful', 'not-helpful');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_contact_messages_status" AS ENUM('new', 'read', 'archived');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('active', 'unsubscribed');
  CREATE TYPE "public"."enum_notifications_type" AS ENUM('contact', 'testimonial', 'system');
  CREATE TYPE "public"."enum_notifications_status" AS ENUM('unread', 'read', 'archived');
  CREATE TYPE "public"."enum_notifications_related_collection" AS ENUM('contact-messages', 'testimonials', 'projects', 'blog-posts', 'system');
  CREATE TYPE "public"."enum_dss_x_feed_cache_source_stability" AS ENUM('stable', 'experimental', 'composite', 'unknown');
  CREATE TYPE "public"."enum_dss_instagram_feed_cache_posts_media_type" AS ENUM('image', 'carousel', 'video');
  CREATE TYPE "public"."enum_dss_instagram_feed_cache_source_mode" AS ENUM('official', 'experimental-web-session', 'official-with-experimental-fallback');
  CREATE TYPE "public"."enum_dss_instagram_feed_cache_source_used" AS ENUM('official', 'experimental-web-session');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'dss-x-feed-sync', 'dss-github-feed-sync', 'dss-instagram-feed-sync');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'dss-x-feed-sync', 'dss-github-feed-sync', 'dss-instagram-feed-sync');
  CREATE TYPE "public"."enum_site_settings_default_language" AS ENUM('en', 'uk');
  CREATE TYPE "public"."enum_homepage_skills_section_cards_workflow_icon" AS ENUM('plan', 'code', 'commit', 'review', 'deploy');
  CREATE TYPE "public"."enum_homepage_skills_section_cards_principles_icon" AS ENUM('layers', 'cube', 'scale', 'wrench', 'flask');
  CREATE TYPE "public"."enum_homepage_skills_section_cards_focus_items_icon" AS ENUM('ai', 'system', 'automation', 'performance');
  CREATE TYPE "public"."enum_homepage_skills_section_cards_key" AS ENUM('frontend', 'workflow', 'backend', 'devops', 'architecture', 'focus');
  CREATE TYPE "public"."enum_homepage_delivery_pipeline_section_metrics_key" AS ENUM('predictable', 'milestones', 'maintainable');
  CREATE TYPE "public"."enum_homepage_delivery_pipeline_section_phases_key" AS ENUM('discovery', 'architecture', 'interface', 'development', 'launch');
  CREATE TYPE "public"."enum_homepage_delivery_pipeline_section_phases_status" AS ENUM('complete', 'progress', 'pending');
  CREATE TYPE "public"."enum_homepage_footer_section_snapshots_kind" AS ENUM('code', 'ui', 'desk', 'quote', 'terminal', 'coffee');
  CREATE TYPE "public"."enum_navigation_landing_links_section" AS ENUM('hero', 'currentMission', 'projects', 'engineerProfile', 'skills', 'delivery', 'insights', 'contact');
  CREATE TYPE "public"."enum_navigation_pages_menu_items_destination" AS ENUM('projects', 'articles', 'custom');
  CREATE TYPE "public"."enum_navigation_pages_menu_items_match" AS ENUM('exact', 'prefix');
  CREATE TYPE "public"."enum_navigation_cta_destination" AS ENUM('contact', 'custom');
  CREATE TYPE "public"."enum_about_hero_actions_icon" AS ENUM('arrow', 'architecture', 'automation', 'code', 'compass', 'layers', 'performance', 'product', 'signal', 'system');
  CREATE TYPE "public"."enum_about_hero_actions_tone" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_about_hero_signals_source" AS ENUM('manual', 'experience-years', 'published-projects');
  CREATE TYPE "public"."enum_about_principles_items_icon" AS ENUM('arrow', 'architecture', 'automation', 'code', 'compass', 'layers', 'performance', 'product', 'signal', 'system');
  CREATE TYPE "public"."enum_about_operating_system_telemetry_tone" AS ENUM('cyan', 'purple');
  CREATE TYPE "public"."enum_about_experience_items_level" AS ENUM('lead', 'advanced', 'working');
  CREATE TYPE "public"."enum_about_current_focus_cards_tone" AS ENUM('cyan', 'purple');
  CREATE TYPE "public"."enum_about_current_focus_cards_icon" AS ENUM('arrow', 'architecture', 'automation', 'code', 'compass', 'layers', 'performance', 'product', 'signal', 'system');
  CREATE TYPE "public"."enum_profile_principles_icon" AS ENUM('architecture', 'documentation', 'code', 'rocket');
  CREATE TYPE "public"."enum_profile_status" AS ENUM('available', 'focused', 'unavailable');
  CREATE TYPE "public"."enum_seo_robots" AS ENUM('index-follow', 'noindex-follow', 'noindex-nofollow');
  CREATE TYPE "public"."enum_dss_x_feed_settings_source_mode" AS ENUM('official-api', 'nitter', 'rsshub', 'fallback', 'custom');
  CREATE TYPE "public"."enum_dss_github_feed_settings_monitor_events_level" AS ENUM('info', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum_dss_github_feed_settings_monitor_status" AS ENUM('idle', 'running', 'success', 'skipped', 'error');
  CREATE TYPE "public"."enum_dss_github_feed_settings_monitor_trigger" AS ENUM('schedule', 'manual', 'endpoint');
  CREATE TYPE "public"."enum_dss_instagram_feed_settings_monitor_events_level" AS ENUM('info', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum_dss_instagram_feed_settings_source_mode" AS ENUM('official', 'experimental-web-session', 'official-with-experimental-fallback');
  CREATE TYPE "public"."enum_dss_instagram_feed_settings_monitor_status" AS ENUM('idle', 'running', 'success', 'skipped', 'error');
  CREATE TYPE "public"."enum_dss_instagram_feed_settings_monitor_trigger" AS ENUM('schedule', 'manual', 'endpoint');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"folder" varchar,
  	"is_public" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"external_provider" "enum_media_external_provider",
  	"external_id" varchar,
  	"external_key" varchar,
  	"external_source_url" varchar,
  	"external_synced_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"type" "enum_categories_type" DEFAULT 'shared' NOT NULL,
  	"parent_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tech_stack" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"color" varchar,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"category_id" integer,
  	"official_url" varchar,
  	"documentation_url" varchar,
  	"featured" boolean DEFAULT false,
  	"visible" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_projects_highlights_icon" DEFAULT 'modules'
  );
  
  CREATE TABLE "projects_case_study_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "projects_architecture_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "projects_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_projects_architecture_icon" DEFAULT 'services',
  	"description" varchar
  );
  
  CREATE TABLE "projects_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"version" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"status" "enum_projects_roadmap_status" DEFAULT 'planned' NOT NULL,
  	"timeframe" varchar
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"alt" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"is_featured" boolean DEFAULT false,
  	"device_frame" "enum_projects_gallery_device_frame" DEFAULT 'none' NOT NULL
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"type" "enum_projects_links_type" DEFAULT 'other' NOT NULL,
  	"is_enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"card_tagline" varchar,
  	"category_id" integer,
  	"description" jsonb NOT NULL,
  	"case_study_code_file_path" varchar,
  	"case_study_code_language" "enum_projects_case_study_code_language" DEFAULT 'typescript',
  	"case_study_code_code" varchar,
  	"cover_image_id" integer,
  	"featured_image_id" integer,
  	"github_url" varchar,
  	"github_owner" varchar,
  	"github_repo" varchar,
  	"github_show_stats" boolean DEFAULT true,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"stage" "enum_projects_stage" DEFAULT 'development' NOT NULL,
  	"progress" numeric DEFAULT 0,
  	"current_version" varchar,
  	"is_featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"started_at" timestamp(3) with time zone,
  	"released_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tech_stack_id" integer,
  	"blog_posts_id" integer
  );
  
  CREATE TABLE "project_versions_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "project_versions_breaking_changes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "project_versions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer NOT NULL,
  	"version" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"release_date" timestamp(3) with time zone,
  	"summary" varchar NOT NULL,
  	"is_stable" boolean DEFAULT true,
  	"is_current" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "blog_posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"cover_image_id" integer,
  	"category_id" integer,
  	"series" varchar,
  	"difficulty" "enum_blog_posts_difficulty" DEFAULT 'intermediate',
  	"related_project_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"reading_time" numeric DEFAULT 5,
  	"views" numeric DEFAULT 0,
  	"status" "enum_blog_posts_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_feedback_votes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL,
  	"vote" "enum_blog_feedback_votes_vote" NOT NULL,
  	"fingerprint" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"message" varchar NOT NULL,
  	"avatar_id" integer,
  	"status" "enum_testimonials_status" DEFAULT 'pending' NOT NULL,
  	"rating" numeric,
  	"source" varchar,
  	"approved_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"status" "enum_contact_messages_status" DEFAULT 'new' NOT NULL,
  	"source" varchar DEFAULT 'website',
  	"archived_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'active' NOT NULL,
  	"source" varchar DEFAULT 'site-footer',
  	"subscribed_at" timestamp(3) with time zone NOT NULL,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"type" "enum_notifications_type" DEFAULT 'system' NOT NULL,
  	"status" "enum_notifications_status" DEFAULT 'unread' NOT NULL,
  	"related_collection" "enum_notifications_related_collection",
  	"related_document_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dss_x_feed_cache_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL
  );
  
  CREATE TABLE "dss_x_feed_cache" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"username" varchar NOT NULL,
  	"post_count" numeric NOT NULL,
  	"source_id" varchar NOT NULL,
  	"source_stability" "enum_dss_x_feed_cache_source_stability" NOT NULL,
  	"checksum" varchar NOT NULL,
  	"generated_at" timestamp(3) with time zone NOT NULL,
  	"fresh_until" timestamp(3) with time zone NOT NULL,
  	"stale_until" timestamp(3) with time zone NOT NULL,
  	"next_sync_at" timestamp(3) with time zone NOT NULL,
  	"snapshot" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dss_github_feed_cache_repositories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"repository" varchar NOT NULL
  );
  
  CREATE TABLE "dss_github_feed_cache_commits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"external_id" varchar NOT NULL,
  	"sha" varchar NOT NULL,
  	"short_sha" varchar NOT NULL,
  	"repository" varchar NOT NULL,
  	"repository_url" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"committed_at" timestamp(3) with time zone NOT NULL,
  	"url" varchar NOT NULL,
  	"author_login" varchar,
  	"author_name" varchar
  );
  
  CREATE TABLE "dss_github_feed_cache_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL
  );
  
  CREATE TABLE "dss_github_feed_cache" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"username" varchar NOT NULL,
  	"checksum" varchar NOT NULL,
  	"adapter_version" varchar NOT NULL,
  	"generated_at" timestamp(3) with time zone NOT NULL,
  	"fresh_until" timestamp(3) with time zone NOT NULL,
  	"stale_until" timestamp(3) with time zone NOT NULL,
  	"next_sync_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dss_instagram_feed_cache_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"external_id" varchar NOT NULL,
  	"shortcode" varchar,
  	"media_type" "enum_dss_instagram_feed_cache_posts_media_type" NOT NULL,
  	"media_product_type" varchar,
  	"image_url" varchar NOT NULL,
  	"thumbnail_url" varchar,
  	"provider_image_url" varchar NOT NULL,
  	"provider_thumbnail_url" varchar,
  	"permalink" varchar NOT NULL,
  	"caption" varchar,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"like_count" numeric,
  	"comment_count" numeric,
  	"username" varchar NOT NULL,
  	"width" numeric,
  	"height" numeric
  );
  
  CREATE TABLE "dss_instagram_feed_cache_warnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL
  );
  
  CREATE TABLE "dss_instagram_feed_cache" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"username" varchar NOT NULL,
  	"source_mode" "enum_dss_instagram_feed_cache_source_mode" NOT NULL,
  	"source_used" "enum_dss_instagram_feed_cache_source_used" NOT NULL,
  	"checksum" varchar NOT NULL,
  	"adapter_version" varchar NOT NULL,
  	"generated_at" timestamp(3) with time zone NOT NULL,
  	"fresh_until" timestamp(3) with time zone NOT NULL,
  	"stale_until" timestamp(3) with time zone NOT NULL,
  	"next_sync_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"concurrency_key" varchar,
  	"meta" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tech_stack_id" integer,
  	"projects_id" integer,
  	"project_versions_id" integer,
  	"blog_posts_id" integer,
  	"blog_feedback_votes_id" integer,
  	"testimonials_id" integer,
  	"contact_messages_id" integer,
  	"newsletter_subscribers_id" integer,
  	"notifications_id" integer,
  	"dss_x_feed_cache_id" integer,
  	"dss_github_feed_cache_id" integer,
  	"dss_instagram_feed_cache_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Portfolio' NOT NULL,
  	"site_description" varchar NOT NULL,
  	"logo_id" integer,
  	"default_language" "enum_site_settings_default_language" DEFAULT 'en' NOT NULL,
  	"footer_copyright_prefix" varchar DEFAULT 'Built with ❤️, clean architecture and',
  	"footer_copyright_emphasis" varchar DEFAULT 'lot',
  	"footer_copyright_suffix" varchar DEFAULT 'of ☕️.',
  	"maintenance_mode" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_skills_section_cards_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards_details_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "homepage_skills_section_cards_workflow" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_homepage_skills_section_cards_workflow_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards_focus_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_skills_section_cards_principles_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards_focus_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_skills_section_cards_focus_items_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_skills_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_homepage_skills_section_cards_key" NOT NULL,
  	"title" varchar NOT NULL,
  	"badge" varchar,
  	"description" varchar NOT NULL,
  	"pills_title" varchar,
  	"workflow_title" varchar
  );
  
  CREATE TABLE "homepage_delivery_pipeline_section_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_homepage_delivery_pipeline_section_metrics_key" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_delivery_pipeline_section_phases_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_delivery_pipeline_section_phases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_homepage_delivery_pipeline_section_phases_key" NOT NULL,
  	"title" varchar NOT NULL,
  	"status" "enum_homepage_delivery_pipeline_section_phases_status" DEFAULT 'pending' NOT NULL
  );
  
  CREATE TABLE "homepage_footer_section_x_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"replies" numeric DEFAULT 0,
  	"reposts" numeric DEFAULT 0,
  	"likes" numeric DEFAULT 0
  );
  
  CREATE TABLE "homepage_footer_section_snapshots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"kind" "enum_homepage_footer_section_snapshots_kind" NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Hi, I''m',
  	"hero_title" varchar DEFAULT 'I don''t just build websites.' NOT NULL,
  	"hero_title_accent" varchar DEFAULT 'websites.',
  	"hero_subtitle" varchar DEFAULT 'I build systems
  that solve real problems.' NOT NULL,
  	"hero_subtitle_accent" varchar DEFAULT 'systems',
  	"hero_primary_cta_label" varchar DEFAULT 'Explore My Work',
  	"hero_primary_cta_url" varchar DEFAULT '#projects',
  	"hero_secondary_cta_label" varchar DEFAULT 'Download CV',
  	"hero_secondary_cta_url" varchar DEFAULT '#contact',
  	"hero_image_id" integer,
  	"current_mission_section_enabled" boolean DEFAULT true,
  	"current_mission_section_eyebrow" varchar DEFAULT 'Current Mission',
  	"current_mission_section_title" varchar,
  	"current_mission_section_description" varchar DEFAULT 'A live preview of the flagship product currently shaping my engineering roadmap.',
  	"current_mission_section_project_id" integer,
  	"current_mission_section_cta_label" varchar DEFAULT 'View Mission Control',
  	"current_mission_section_cta_url_override" varchar,
  	"current_mission_section_footer_label" varchar DEFAULT 'Mission Status',
  	"current_mission_section_footer_text" varchar DEFAULT 'Building the future, one release at a time.',
  	"skills_section_eyebrow" varchar DEFAULT 'Skills & Technologies',
  	"skills_section_title" varchar DEFAULT 'My Engineering Toolkit',
  	"skills_section_description" varchar DEFAULT 'The technologies, tools and practices I use to design, build and ship scalable digital products.',
  	"skills_section_footer_label" varchar DEFAULT 'Technology is just a tool.',
  	"skills_section_footer_text" varchar DEFAULT 'Problem solving is the craft.',
  	"delivery_pipeline_section_enabled" boolean DEFAULT true,
  	"delivery_pipeline_section_eyebrow" varchar DEFAULT 'DELIVERY PIPELINE',
  	"delivery_pipeline_section_title" varchar DEFAULT 'From rough idea to production-ready system.',
  	"delivery_pipeline_section_title_accent" varchar DEFAULT 'production-ready',
  	"delivery_pipeline_section_description" varchar DEFAULT 'A clear build process for turning vague requirements into stable, maintainable products.',
  	"delivery_pipeline_section_footer_label" varchar DEFAULT 'Structured process',
  	"delivery_pipeline_section_footer_text" varchar DEFAULT 'Clear scope. Clean build. Reliable launch.',
  	"engineer_profile_section_enabled" boolean DEFAULT true,
  	"engineer_profile_section_eyebrow" varchar DEFAULT 'About me',
  	"engineer_profile_section_title" varchar DEFAULT 'Engineer Profile',
  	"engineer_profile_section_description" varchar DEFAULT 'A builder of scalable systems and meaningful digital experiences.',
  	"engineer_profile_section_journey_title" varchar DEFAULT 'Engineering Journey',
  	"engineer_profile_section_journey_meta" varchar DEFAULT '// my path',
  	"engineer_profile_section_journey_footer" varchar DEFAULT 'MISSION: CONTINUOUS IMPROVEMENT',
  	"engineer_profile_section_principles_title" varchar DEFAULT 'Engineering Philosophy',
  	"engineer_profile_section_principles_meta" varchar DEFAULT '// principles',
  	"engineer_profile_section_footer_label" varchar DEFAULT 'Engineer mindset',
  	"engineer_profile_section_footer_text" varchar DEFAULT 'turning complex ideas into clean, maintainable systems.',
  	"insights_trust_section_enabled" boolean DEFAULT true,
  	"insights_trust_section_eyebrow" varchar DEFAULT 'INSIGHTS & TRUST',
  	"insights_trust_section_title" varchar DEFAULT 'Latest Articles & Client Feedback',
  	"insights_trust_section_title_accent" varchar DEFAULT 'Articles',
  	"insights_trust_section_title_muted" varchar DEFAULT 'Feedback',
  	"insights_trust_section_description" varchar DEFAULT 'Build notes, engineering thoughts and client feedback collected from real project work.',
  	"insights_trust_section_articles_title" varchar DEFAULT 'Latest Articles',
  	"insights_trust_section_featured_label" varchar DEFAULT 'Featured',
  	"insights_trust_section_article_links_enabled" boolean DEFAULT false,
  	"insights_trust_section_articles_cta_enabled" boolean DEFAULT false,
  	"insights_trust_section_articles_cta_label" varchar DEFAULT 'View all articles',
  	"insights_trust_section_articles_cta_url" varchar DEFAULT '/articles',
  	"insights_trust_section_featured_article_id" integer,
  	"insights_trust_section_feedback_title" varchar DEFAULT 'Client Feedback',
  	"insights_trust_section_trust_title" varchar DEFAULT 'Trust Signals',
  	"insights_trust_section_footer_label" varchar DEFAULT 'Real projects. Real feedback. Real impact.',
  	"insights_trust_section_footer_text" varchar DEFAULT 'Built with passion. Delivered with precision.',
  	"social_feeds_section_enabled" boolean DEFAULT false,
  	"social_feeds_section_title" varchar,
  	"social_feeds_section_description" varchar,
  	"footer_section_enabled" boolean DEFAULT true,
  	"footer_section_availability_label" varchar DEFAULT 'Available',
  	"footer_section_connect_label" varchar DEFAULT 'Connect',
  	"footer_section_x_title" varchar DEFAULT 'X Signals',
  	"footer_section_x_handle" varchar DEFAULT '@ak_dev',
  	"footer_section_x_link_label" varchar DEFAULT 'View more on X',
  	"footer_section_snapshots_title" varchar DEFAULT 'Build Snapshots',
  	"footer_section_snapshots_subtitle" varchar DEFAULT 'Instagram visual log',
  	"footer_section_instagram_link_label" varchar DEFAULT 'View on Instagram',
  	"footer_section_newsletter_title" varchar DEFAULT 'Build Notes',
  	"footer_section_newsletter_description" varchar DEFAULT 'Notes on engineering, architecture and better products.',
  	"footer_section_newsletter_placeholder" varchar DEFAULT 'What''s a good email address?',
  	"footer_section_newsletter_button_label" varchar DEFAULT 'Gimme!',
  	"footer_section_newsletter_note" varchar DEFAULT 'No spam. Unsubscribe anytime.',
  	"contact_section_enabled" boolean DEFAULT true,
  	"contact_section_eyebrow" varchar DEFAULT 'CONTACT',
  	"contact_section_title" varchar DEFAULT 'Not enough? Let''s talk.',
  	"contact_section_title_accent" varchar DEFAULT 'Let''s talk.',
  	"contact_section_description" varchar DEFAULT 'If you need a scalable product, clean architecture and reliable delivery — I’m ready to discuss your project.',
  	"contact_section_form_title" varchar DEFAULT 'Start the conversation',
  	"contact_section_form_description" varchar DEFAULT 'Tell me what you’re building, what you need, and where you need help.',
  	"contact_section_footer_label" varchar DEFAULT 'Mission link',
  	"contact_section_footer_text" varchar DEFAULT 'Open for freelance, product work and collaboration.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"tech_stack_id" integer,
  	"blog_posts_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "navigation_landing_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"label" varchar NOT NULL,
  	"section" "enum_navigation_landing_links_section" NOT NULL
  );
  
  CREATE TABLE "navigation_pages_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"destination" "enum_navigation_pages_menu_items_destination" DEFAULT 'custom' NOT NULL,
  	"href" varchar,
  	"match" "enum_navigation_pages_menu_items_match" DEFAULT 'exact',
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pages_menu_enabled" boolean DEFAULT true,
  	"pages_menu_label" varchar DEFAULT 'Explore' NOT NULL,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_label" varchar DEFAULT 'Let''s Talk' NOT NULL,
  	"cta_destination" "enum_navigation_cta_destination" DEFAULT 'contact' NOT NULL,
  	"cta_href" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"icon" "enum_about_hero_actions_icon" NOT NULL,
  	"tone" "enum_about_hero_actions_tone" DEFAULT 'secondary' NOT NULL
  );
  
  CREATE TABLE "about_hero_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_about_hero_signals_source" DEFAULT 'manual' NOT NULL,
  	"value" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_career_items_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_career_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_principles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_principles_items_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_operating_system_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"output" varchar NOT NULL
  );
  
  CREATE TABLE "about_operating_system_current_stage_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_operating_system_guardrails_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "about_operating_system_outputs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_operating_system_telemetry" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"tone" "enum_about_operating_system_telemetry_tone" DEFAULT 'cyan' NOT NULL
  );
  
  CREATE TABLE "about_experience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL,
  	"level" "enum_about_experience_items_level" NOT NULL,
  	"score" numeric NOT NULL,
  	"example" varchar NOT NULL
  );
  
  CREATE TABLE "about_experience_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_current_focus_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_current_focus_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"status" varchar NOT NULL,
  	"tone" "enum_about_current_focus_cards_tone" DEFAULT 'cyan' NOT NULL,
  	"icon" "enum_about_current_focus_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"footer_label" varchar NOT NULL,
  	"footer_value" varchar NOT NULL
  );
  
  CREATE TABLE "about_personal_signals_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_enabled" boolean DEFAULT true,
  	"hero_eyebrow" varchar DEFAULT 'Engineering Profile' NOT NULL,
  	"hero_title" varchar DEFAULT 'Engineering systems, interfaces, and ideas' NOT NULL,
  	"hero_title_accent" varchar DEFAULT 'that are built to last.' NOT NULL,
  	"hero_description" varchar DEFAULT 'I design and build complex digital products with a focus on architecture, performance, maintainability, and interfaces that communicate clearly.' NOT NULL,
  	"career_enabled" boolean DEFAULT true,
  	"career_eyebrow" varchar DEFAULT '01 / Career timeline' NOT NULL,
  	"career_title" varchar DEFAULT 'A path shaped by larger systems' NOT NULL,
  	"career_description" varchar DEFAULT 'The role changed over time. The direction stayed consistent: understand more of the product and take responsibility for the whole result.' NOT NULL,
  	"principles_enabled" boolean DEFAULT true,
  	"principles_eyebrow" varchar DEFAULT '02 / How I think' NOT NULL,
  	"principles_title" varchar DEFAULT 'Engineering principles' NOT NULL,
  	"principles_description" varchar DEFAULT 'The practical rules behind architecture and product decisions.' NOT NULL,
  	"operating_system_enabled" boolean DEFAULT true,
  	"operating_system_eyebrow" varchar DEFAULT '03 / Operating system' NOT NULL,
  	"operating_system_title" varchar DEFAULT 'How I build' NOT NULL,
  	"operating_system_description" varchar DEFAULT 'A repeatable path from an unclear problem to a product that can evolve.' NOT NULL,
  	"operating_system_current_stage_label" varchar DEFAULT 'Current stage' NOT NULL,
  	"operating_system_current_stage_title" varchar DEFAULT 'System design' NOT NULL,
  	"operating_system_current_stage_description" varchar DEFAULT 'Define boundaries, data ownership, failure modes, interfaces, and the smallest architecture that supports the next meaningful version.' NOT NULL,
  	"operating_system_guardrails_eyebrow" varchar DEFAULT 'System controls' NOT NULL,
  	"operating_system_guardrails_title" varchar DEFAULT 'Engineering guardrails' NOT NULL,
  	"operating_system_guardrails_status" varchar DEFAULT 'Active' NOT NULL,
  	"operating_system_outputs_eyebrow" varchar DEFAULT 'Delivery package' NOT NULL,
  	"operating_system_outputs_title" varchar DEFAULT 'Concrete outputs' NOT NULL,
  	"operating_system_outputs_status" varchar DEFAULT '4 artifacts' NOT NULL,
  	"experience_enabled" boolean DEFAULT true,
  	"experience_eyebrow" varchar DEFAULT '04 / Experience matrix' NOT NULL,
  	"experience_title" varchar DEFAULT 'Responsibility, not percentages' NOT NULL,
  	"experience_description" varchar DEFAULT 'A compact view of where I lead, where I work deeply, and where I support the system.' NOT NULL,
  	"current_focus_enabled" boolean DEFAULT true,
  	"current_focus_eyebrow" varchar DEFAULT '05 / Current focus' NOT NULL,
  	"current_focus_title" varchar DEFAULT 'What is active now' NOT NULL,
  	"current_focus_description" varchar DEFAULT 'Products, research, and technical directions currently receiving attention.' NOT NULL,
  	"current_focus_primary_label" varchar DEFAULT 'Now building' NOT NULL,
  	"current_focus_primary_project_id" integer,
  	"current_focus_primary_link_label" varchar DEFAULT 'View project' NOT NULL,
  	"personal_signals_enabled" boolean DEFAULT true,
  	"personal_signals_eyebrow" varchar DEFAULT '06 / Beyond the code' NOT NULL,
  	"personal_signals_title" varchar DEFAULT 'Personal signals' NOT NULL,
  	"personal_signals_description" varchar DEFAULT 'The things that shape the work without appearing in the repository.' NOT NULL,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_eyebrow" varchar DEFAULT 'Open channel / New project' NOT NULL,
  	"cta_title" varchar DEFAULT 'Have a complex idea?' NOT NULL,
  	"cta_title_accent" varchar DEFAULT 'Let''s turn it into a working system.' NOT NULL,
  	"cta_description" varchar DEFAULT 'I am open to selected products, architecture work, technical direction, and meaningful collaborations.' NOT NULL,
  	"cta_label" varchar DEFAULT 'Start a conversation' NOT NULL,
  	"cta_href" varchar DEFAULT '/#contact' NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Engineering Profile' NOT NULL,
  	"seo_meta_description" varchar DEFAULT 'A deeper view into my engineering journey, product mindset, architecture principles, technical focus, and the systems I build.' NOT NULL,
  	"seo_canonical" varchar DEFAULT '/about' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "profile_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "profile_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"accent" boolean DEFAULT false
  );
  
  CREATE TABLE "profile_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_profile_principles_icon" DEFAULT 'architecture' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Andrii Kulahin' NOT NULL,
  	"role" varchar DEFAULT 'Software Engineer' NOT NULL,
  	"location" varchar DEFAULT 'Ukraine',
  	"status" "enum_profile_status" DEFAULT 'available',
  	"portrait_id" integer,
  	"short_bio" varchar,
  	"availability" varchar,
  	"career_started_at" timestamp(3) with time zone DEFAULT '2014-01-01T00:00:00.000Z',
  	"completed_projects_outside_portfolio" numeric DEFAULT 0,
  	"cv_file_id" integer,
  	"profile_id" varchar DEFAULT 'AK_10061988',
  	"full_bio" varchar DEFAULT 'I build scalable web applications and distributed systems. Architecture first. Quality always.',
  	"hero_activity_enabled" boolean DEFAULT false,
  	"hero_activity_label" varchar,
  	"hero_activity_detail" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "public_pages_projects_cta_identity_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "public_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"blog_seo_meta_title" varchar DEFAULT 'Engineering Journal' NOT NULL,
  	"blog_seo_meta_description" varchar DEFAULT 'Architecture notes, implementation details, system design decisions, and lessons learned while building production software.' NOT NULL,
  	"blog_seo_canonical" varchar DEFAULT '/blog' NOT NULL,
  	"blog_index_posts_per_page" numeric DEFAULT 6 NOT NULL,
  	"blog_index_breadcrumb_label" varchar DEFAULT 'Blog' NOT NULL,
  	"blog_index_eyebrow" varchar DEFAULT 'Engineering journal' NOT NULL,
  	"blog_index_title" varchar DEFAULT 'Engineering Journal.' NOT NULL,
  	"blog_index_title_accent" varchar DEFAULT 'Build. Document. Share.' NOT NULL,
  	"blog_index_description" varchar DEFAULT 'Real architecture, production notes, implementation details, and lessons learned from building complex systems.' NOT NULL,
  	"blog_index_featured_label" varchar DEFAULT 'Featured article' NOT NULL,
  	"blog_index_articles_eyebrow" varchar DEFAULT 'Latest articles' NOT NULL,
  	"blog_index_articles_title" varchar DEFAULT 'Notes from the build process.' NOT NULL,
  	"blog_article_breadcrumb_label" varchar DEFAULT 'Blog' NOT NULL,
  	"blog_article_fallback_category" varchar DEFAULT 'Uncategorized' NOT NULL,
  	"blog_article_fallback_series" varchar DEFAULT 'Independent note' NOT NULL,
  	"blog_article_cta_eyebrow" varchar DEFAULT 'Enjoying the read?' NOT NULL,
  	"blog_article_cta_description" varchar DEFAULT 'Get new architecture notes and implementation lessons.' NOT NULL,
  	"blog_article_cta_label" varchar DEFAULT 'Let''s talk' NOT NULL,
  	"blog_article_cta_href" varchar DEFAULT '/contacts' NOT NULL,
  	"blog_article_overview_label" varchar DEFAULT 'Overview' NOT NULL,
  	"blog_article_engineering_note_label" varchar DEFAULT 'Engineering note' NOT NULL,
  	"blog_article_engineering_note" varchar DEFAULT 'The strongest architecture decisions are the ones that remain understandable after the implementation grows.' NOT NULL,
  	"blog_article_fallback_cover_title" varchar DEFAULT 'Engineering system map' NOT NULL,
  	"projects_seo_meta_title" varchar DEFAULT 'Projects' NOT NULL,
  	"projects_seo_meta_description" varchar DEFAULT 'Selected software products, experiments, and engineering case studies.' NOT NULL,
  	"projects_seo_canonical" varchar DEFAULT '/projects' NOT NULL,
  	"projects_index_breadcrumb_label" varchar DEFAULT 'Projects' NOT NULL,
  	"projects_index_eyebrow" varchar DEFAULT 'Project registry' NOT NULL,
  	"projects_index_title" varchar DEFAULT 'All' NOT NULL,
  	"projects_index_title_accent" varchar DEFAULT 'Projects' NOT NULL,
  	"projects_index_description" varchar DEFAULT 'A collection of systems I''ve designed, built, and shipped. From idea to production.' NOT NULL,
  	"projects_index_total_projects_label" varchar DEFAULT 'Total projects' NOT NULL,
  	"projects_index_total_projects_hint" varchar DEFAULT 'and counting' NOT NULL,
  	"projects_index_open_source_label" varchar DEFAULT 'Open source' NOT NULL,
  	"projects_index_open_source_hint" varchar DEFAULT 'projects' NOT NULL,
  	"projects_index_years_building_label" varchar DEFAULT 'Years building' NOT NULL,
  	"projects_index_years_building_hint" varchar DEFAULT 'of experience' NOT NULL,
  	"projects_index_code_commitments_label" varchar DEFAULT 'Code commitments' NOT NULL,
  	"projects_index_code_commitments_hint" varchar DEFAULT 'across all projects' NOT NULL,
  	"projects_cta_terminal_label" varchar DEFAULT 'TERMINAL' NOT NULL,
  	"projects_cta_terminal_command" varchar DEFAULT 'visitor@portfolio:~$ whoami' NOT NULL,
  	"projects_cta_terminal_prompt" varchar DEFAULT 'visitor@portfolio:~$' NOT NULL,
  	"projects_cta_eyebrow" varchar DEFAULT 'Have an idea?' NOT NULL,
  	"projects_cta_title" varchar DEFAULT 'Let''s build something amazing together.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_meta_title" varchar NOT NULL,
  	"default_meta_description" varchar NOT NULL,
  	"default_og_image_id" integer,
  	"robots" "enum_seo_robots" DEFAULT 'index-follow' NOT NULL,
  	"sitemap_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "social" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"github_url" varchar,
  	"linkedin_url" varchar,
  	"telegram_url" varchar,
  	"x_url" varchar,
  	"instagram_url" varchar,
  	"dribbble_url" varchar,
  	"youtube_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"location" varchar,
  	"contact_form_enabled" boolean DEFAULT true,
  	"page_enabled" boolean DEFAULT true,
  	"page_breadcrumb_label" varchar DEFAULT 'Contacts' NOT NULL,
  	"page_eyebrow" varchar DEFAULT 'Open communication channel' NOT NULL,
  	"page_title" varchar DEFAULT 'Let’s build something that deserves to exist.' NOT NULL,
  	"page_title_accent" varchar DEFAULT 'deserves to exist.' NOT NULL,
  	"page_description" varchar DEFAULT 'Share the problem, product idea, or engineering challenge. I’ll review the context and reply with a clear next step.' NOT NULL,
  	"page_response_time_label" varchar DEFAULT 'Response time' NOT NULL,
  	"page_response_time_value" varchar DEFAULT 'Within 1–2 business days' NOT NULL,
  	"page_working_mode_label" varchar DEFAULT 'Working mode' NOT NULL,
  	"page_working_mode_value" varchar DEFAULT 'Remote-first · async-friendly' NOT NULL,
  	"page_channels_eyebrow" varchar DEFAULT 'Direct channels' NOT NULL,
  	"page_channels_title" varchar DEFAULT 'Choose the channel that fits the conversation.' NOT NULL,
  	"page_channels_description" varchar DEFAULT 'Email works best for project context. Telegram is useful for a quick first contact. Location and availability are kept in the shared profile settings.' NOT NULL,
  	"page_form_eyebrow" varchar DEFAULT 'Project intake' NOT NULL,
  	"page_form_title" varchar DEFAULT 'Start the conversation' NOT NULL,
  	"page_form_description" varchar DEFAULT 'Tell me what you are building, where the project stands, and what kind of help you need.' NOT NULL,
  	"page_process_eyebrow" varchar DEFAULT 'Communication protocol' NOT NULL,
  	"page_process_title" varchar DEFAULT 'What happens after you send the message.' NOT NULL,
  	"page_process_description" varchar DEFAULT 'No vague sales funnel. The goal is to understand the work, identify fit, and define the smallest useful next step.' NOT NULL,
  	"page_social_eyebrow" varchar DEFAULT 'Public network' NOT NULL,
  	"page_social_title" varchar DEFAULT 'Follow the work between releases.' NOT NULL,
  	"page_social_description" varchar DEFAULT 'Code, product progress, engineering notes, and selected experiments are published through the connected social channels.' NOT NULL,
  	"page_seo_meta_title" varchar DEFAULT 'Contacts' NOT NULL,
  	"page_seo_meta_description" varchar DEFAULT 'Contact Andrii Kulahin about product engineering, architecture, full-stack development, technical direction, and selected collaborations.' NOT NULL,
  	"page_seo_canonical" varchar DEFAULT '/contacts' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "analytics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"google_analytics_id" varchar,
  	"plausible_domain" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dss_x_feed_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"username" varchar,
  	"source_mode" "enum_dss_x_feed_settings_source_mode" DEFAULT 'official-api' NOT NULL,
  	"nitter_base_url" varchar,
  	"rss_hub_base_url" varchar,
  	"post_limit" numeric DEFAULT 10 NOT NULL,
  	"display_post_limit" numeric DEFAULT 3 NOT NULL,
  	"exclude_replies" boolean DEFAULT true,
  	"exclude_reposts" boolean DEFAULT true,
  	"sync_interval_minutes" numeric DEFAULT 60 NOT NULL,
  	"fresh_for_minutes" numeric DEFAULT 90 NOT NULL,
  	"stale_for_hours" numeric DEFAULT 24 NOT NULL,
  	"failure_threshold" numeric DEFAULT 3 NOT NULL,
  	"notification_cooldown_hours" numeric DEFAULT 12 NOT NULL,
  	"monitor_state" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dss_github_feed_settings_repositories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"repository" varchar NOT NULL
  );
  
  CREATE TABLE "dss_github_feed_settings_monitor_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"level" "enum_dss_github_feed_settings_monitor_events_level" NOT NULL,
  	"message" varchar NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"context" jsonb
  );
  
  CREATE TABLE "dss_github_feed_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"username" varchar,
  	"commit_limit" numeric DEFAULT 10 NOT NULL,
  	"display_commit_limit" numeric DEFAULT 2 NOT NULL,
  	"sync_interval_hours" numeric DEFAULT 1 NOT NULL,
  	"fresh_for_minutes" numeric DEFAULT 90 NOT NULL,
  	"stale_for_hours" numeric DEFAULT 24 NOT NULL,
  	"monitor_status" "enum_dss_github_feed_settings_monitor_status" DEFAULT 'idle',
  	"monitor_run_id" varchar,
  	"monitor_trigger" "enum_dss_github_feed_settings_monitor_trigger",
  	"monitor_attempt_count" numeric DEFAULT 0,
  	"monitor_last_attempt_at" timestamp(3) with time zone,
  	"monitor_last_success_at" timestamp(3) with time zone,
  	"monitor_completed_at" timestamp(3) with time zone,
  	"monitor_duration_ms" numeric,
  	"monitor_commit_count" numeric DEFAULT 0,
  	"monitor_checksum" varchar,
  	"monitor_generated_at" timestamp(3) with time zone,
  	"monitor_fresh_until" timestamp(3) with time zone,
  	"monitor_stale_until" timestamp(3) with time zone,
  	"monitor_next_sync_at" timestamp(3) with time zone,
  	"monitor_adapter_version" varchar,
  	"monitor_last_error" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dss_instagram_feed_settings_monitor_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"level" "enum_dss_instagram_feed_settings_monitor_events_level" NOT NULL,
  	"message" varchar NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"context" jsonb
  );
  
  CREATE TABLE "dss_instagram_feed_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"username" varchar,
  	"source_mode" "enum_dss_instagram_feed_settings_source_mode" DEFAULT 'official' NOT NULL,
  	"fetch_limit" numeric DEFAULT 12 NOT NULL,
  	"display_post_limit" numeric DEFAULT 6 NOT NULL,
  	"include_videos" boolean DEFAULT false,
  	"sync_interval_hours" numeric DEFAULT 6 NOT NULL,
  	"fresh_for_minutes" numeric DEFAULT 390 NOT NULL,
  	"stale_for_hours" numeric DEFAULT 168 NOT NULL,
  	"graph_version" varchar DEFAULT 'v25.0' NOT NULL,
  	"timeout_ms" numeric DEFAULT 15000 NOT NULL,
  	"monitor_status" "enum_dss_instagram_feed_settings_monitor_status" DEFAULT 'idle',
  	"monitor_run_id" varchar,
  	"monitor_trigger" "enum_dss_instagram_feed_settings_monitor_trigger",
  	"monitor_attempt_count" numeric DEFAULT 0,
  	"monitor_last_attempt_at" timestamp(3) with time zone,
  	"monitor_last_success_at" timestamp(3) with time zone,
  	"monitor_completed_at" timestamp(3) with time zone,
  	"monitor_duration_ms" numeric,
  	"monitor_post_count" numeric DEFAULT 0,
  	"monitor_checksum" varchar,
  	"monitor_generated_at" timestamp(3) with time zone,
  	"monitor_fresh_until" timestamp(3) with time zone,
  	"monitor_stale_until" timestamp(3) with time zone,
  	"monitor_next_sync_at" timestamp(3) with time zone,
  	"monitor_adapter_version" varchar,
  	"monitor_last_error" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_jobs_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tech_stack" ADD CONSTRAINT "tech_stack_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_case_study_metrics" ADD CONSTRAINT "projects_case_study_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_architecture_items" ADD CONSTRAINT "projects_architecture_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_architecture" ADD CONSTRAINT "projects_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_roadmap" ADD CONSTRAINT "projects_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tech_stack_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_versions_highlights" ADD CONSTRAINT "project_versions_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_versions_breaking_changes" ADD CONSTRAINT "project_versions_breaking_changes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_versions" ADD CONSTRAINT "project_versions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_key_takeaways" ADD CONSTRAINT "blog_posts_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_tags" ADD CONSTRAINT "blog_posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_feedback_votes" ADD CONSTRAINT "blog_feedback_votes_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dss_x_feed_cache_warnings" ADD CONSTRAINT "dss_x_feed_cache_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_x_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_github_feed_cache_repositories" ADD CONSTRAINT "dss_github_feed_cache_repositories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_github_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_github_feed_cache_commits" ADD CONSTRAINT "dss_github_feed_cache_commits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_github_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_github_feed_cache_warnings" ADD CONSTRAINT "dss_github_feed_cache_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_github_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_instagram_feed_cache_posts" ADD CONSTRAINT "dss_instagram_feed_cache_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_instagram_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_instagram_feed_cache_warnings" ADD CONSTRAINT "dss_instagram_feed_cache_warnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_instagram_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_stack_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_versions_fk" FOREIGN KEY ("project_versions_id") REFERENCES "public"."project_versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_feedback_votes_fk" FOREIGN KEY ("blog_feedback_votes_id") REFERENCES "public"."blog_feedback_votes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notifications_fk" FOREIGN KEY ("notifications_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dss_x_feed_cache_fk" FOREIGN KEY ("dss_x_feed_cache_id") REFERENCES "public"."dss_x_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dss_github_feed_cache_fk" FOREIGN KEY ("dss_github_feed_cache_id") REFERENCES "public"."dss_github_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dss_instagram_feed_cache_fk" FOREIGN KEY ("dss_instagram_feed_cache_id") REFERENCES "public"."dss_instagram_feed_cache"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_navigation" ADD CONSTRAINT "site_settings_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_pills" ADD CONSTRAINT "homepage_skills_section_cards_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_details_items" ADD CONSTRAINT "homepage_skills_section_cards_details_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_details" ADD CONSTRAINT "homepage_skills_section_cards_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_workflow" ADD CONSTRAINT "homepage_skills_section_cards_workflow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_focus_line" ADD CONSTRAINT "homepage_skills_section_cards_focus_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_principles" ADD CONSTRAINT "homepage_skills_section_cards_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards_focus_items" ADD CONSTRAINT "homepage_skills_section_cards_focus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_skills_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_skills_section_cards" ADD CONSTRAINT "homepage_skills_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_delivery_pipeline_section_metrics" ADD CONSTRAINT "homepage_delivery_pipeline_section_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_delivery_pipeline_section_phases_items" ADD CONSTRAINT "homepage_delivery_pipeline_section_phases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_delivery_pipeline_section_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_delivery_pipeline_section_phases" ADD CONSTRAINT "homepage_delivery_pipeline_section_phases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_footer_section_x_posts" ADD CONSTRAINT "homepage_footer_section_x_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_footer_section_snapshots" ADD CONSTRAINT "homepage_footer_section_snapshots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_footer_section_snapshots" ADD CONSTRAINT "homepage_footer_section_snapshots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_current_mission_section_project_id_projects_id_fk" FOREIGN KEY ("current_mission_section_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_insights_trust_section_featured_article_id_blog_posts_id_fk" FOREIGN KEY ("insights_trust_section_featured_article_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_tech_stack_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_landing_links" ADD CONSTRAINT "navigation_landing_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_pages_menu_items" ADD CONSTRAINT "navigation_pages_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_hero_actions" ADD CONSTRAINT "about_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_hero_signals" ADD CONSTRAINT "about_hero_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_career_items_stack" ADD CONSTRAINT "about_career_items_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_career_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_career_items" ADD CONSTRAINT "about_career_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_principles_items" ADD CONSTRAINT "about_principles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_operating_system_steps" ADD CONSTRAINT "about_operating_system_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_operating_system_current_stage_items" ADD CONSTRAINT "about_operating_system_current_stage_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_operating_system_guardrails_items" ADD CONSTRAINT "about_operating_system_guardrails_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_operating_system_outputs_items" ADD CONSTRAINT "about_operating_system_outputs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_operating_system_telemetry" ADD CONSTRAINT "about_operating_system_telemetry_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_experience_items" ADD CONSTRAINT "about_experience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_experience_summary" ADD CONSTRAINT "about_experience_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_current_focus_cards_tags" ADD CONSTRAINT "about_current_focus_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_current_focus_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_current_focus_cards" ADD CONSTRAINT "about_current_focus_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_personal_signals_items" ADD CONSTRAINT "about_personal_signals_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_current_focus_primary_project_id_projects_id_fk" FOREIGN KEY ("current_focus_primary_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile_metrics" ADD CONSTRAINT "profile_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_journey" ADD CONSTRAINT "profile_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_principles" ADD CONSTRAINT "profile_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "public_pages_projects_cta_identity_lines" ADD CONSTRAINT "public_pages_projects_cta_identity_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_process_steps" ADD CONSTRAINT "contact_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_github_feed_settings_repositories" ADD CONSTRAINT "dss_github_feed_settings_repositories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_github_feed_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_github_feed_settings_monitor_events" ADD CONSTRAINT "dss_github_feed_settings_monitor_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_github_feed_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dss_instagram_feed_settings_monitor_events" ADD CONSTRAINT "dss_instagram_feed_settings_monitor_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dss_instagram_feed_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_tags_order_idx" ON "media_tags" USING btree ("_order");
  CREATE INDEX "media_tags_parent_id_idx" ON "media_tags" USING btree ("_parent_id");
  CREATE INDEX "media_external_provider_idx" ON "media" USING btree ("external_provider");
  CREATE INDEX "media_external_id_idx" ON "media" USING btree ("external_id");
  CREATE UNIQUE INDEX "media_external_key_idx" ON "media" USING btree ("external_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tech_stack_slug_idx" ON "tech_stack" USING btree ("slug");
  CREATE INDEX "tech_stack_category_idx" ON "tech_stack" USING btree ("category_id");
  CREATE INDEX "tech_stack_updated_at_idx" ON "tech_stack" USING btree ("updated_at");
  CREATE INDEX "tech_stack_created_at_idx" ON "tech_stack" USING btree ("created_at");
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "projects_case_study_metrics_order_idx" ON "projects_case_study_metrics" USING btree ("_order");
  CREATE INDEX "projects_case_study_metrics_parent_id_idx" ON "projects_case_study_metrics" USING btree ("_parent_id");
  CREATE INDEX "projects_architecture_items_order_idx" ON "projects_architecture_items" USING btree ("_order");
  CREATE INDEX "projects_architecture_items_parent_id_idx" ON "projects_architecture_items" USING btree ("_parent_id");
  CREATE INDEX "projects_architecture_order_idx" ON "projects_architecture" USING btree ("_order");
  CREATE INDEX "projects_architecture_parent_id_idx" ON "projects_architecture" USING btree ("_parent_id");
  CREATE INDEX "projects_roadmap_order_idx" ON "projects_roadmap" USING btree ("_order");
  CREATE INDEX "projects_roadmap_parent_id_idx" ON "projects_roadmap" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_category_idx" ON "projects" USING btree ("category_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_featured_image_idx" ON "projects" USING btree ("featured_image_id");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_tech_stack_id_idx" ON "projects_rels" USING btree ("tech_stack_id");
  CREATE INDEX "projects_rels_blog_posts_id_idx" ON "projects_rels" USING btree ("blog_posts_id");
  CREATE INDEX "project_versions_highlights_order_idx" ON "project_versions_highlights" USING btree ("_order");
  CREATE INDEX "project_versions_highlights_parent_id_idx" ON "project_versions_highlights" USING btree ("_parent_id");
  CREATE INDEX "project_versions_breaking_changes_order_idx" ON "project_versions_breaking_changes" USING btree ("_order");
  CREATE INDEX "project_versions_breaking_changes_parent_id_idx" ON "project_versions_breaking_changes" USING btree ("_parent_id");
  CREATE INDEX "project_versions_project_idx" ON "project_versions" USING btree ("project_id");
  CREATE INDEX "project_versions_updated_at_idx" ON "project_versions" USING btree ("updated_at");
  CREATE INDEX "project_versions_created_at_idx" ON "project_versions" USING btree ("created_at");
  CREATE INDEX "blog_posts_key_takeaways_order_idx" ON "blog_posts_key_takeaways" USING btree ("_order");
  CREATE INDEX "blog_posts_key_takeaways_parent_id_idx" ON "blog_posts_key_takeaways" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_tags_order_idx" ON "blog_posts_tags" USING btree ("_order");
  CREATE INDEX "blog_posts_tags_parent_id_idx" ON "blog_posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_cover_image_idx" ON "blog_posts" USING btree ("cover_image_id");
  CREATE INDEX "blog_posts_category_idx" ON "blog_posts" USING btree ("category_id");
  CREATE INDEX "blog_posts_related_project_idx" ON "blog_posts" USING btree ("related_project_id");
  CREATE INDEX "blog_posts_seo_seo_og_image_idx" ON "blog_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_feedback_votes_post_idx" ON "blog_feedback_votes" USING btree ("post_id");
  CREATE INDEX "blog_feedback_votes_vote_idx" ON "blog_feedback_votes" USING btree ("vote");
  CREATE UNIQUE INDEX "blog_feedback_votes_fingerprint_idx" ON "blog_feedback_votes" USING btree ("fingerprint");
  CREATE INDEX "blog_feedback_votes_updated_at_idx" ON "blog_feedback_votes" USING btree ("updated_at");
  CREATE INDEX "blog_feedback_votes_created_at_idx" ON "blog_feedback_votes" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
  CREATE INDEX "contact_messages_created_at_idx" ON "contact_messages" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "notifications_updated_at_idx" ON "notifications" USING btree ("updated_at");
  CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("created_at");
  CREATE INDEX "dss_x_feed_cache_warnings_order_idx" ON "dss_x_feed_cache_warnings" USING btree ("_order");
  CREATE INDEX "dss_x_feed_cache_warnings_parent_id_idx" ON "dss_x_feed_cache_warnings" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "dss_x_feed_cache_key_idx" ON "dss_x_feed_cache" USING btree ("key");
  CREATE INDEX "dss_x_feed_cache_username_idx" ON "dss_x_feed_cache" USING btree ("username");
  CREATE INDEX "dss_x_feed_cache_generated_at_idx" ON "dss_x_feed_cache" USING btree ("generated_at");
  CREATE INDEX "dss_x_feed_cache_next_sync_at_idx" ON "dss_x_feed_cache" USING btree ("next_sync_at");
  CREATE INDEX "dss_x_feed_cache_updated_at_idx" ON "dss_x_feed_cache" USING btree ("updated_at");
  CREATE INDEX "dss_x_feed_cache_created_at_idx" ON "dss_x_feed_cache" USING btree ("created_at");
  CREATE INDEX "dss_github_feed_cache_repositories_order_idx" ON "dss_github_feed_cache_repositories" USING btree ("_order");
  CREATE INDEX "dss_github_feed_cache_repositories_parent_id_idx" ON "dss_github_feed_cache_repositories" USING btree ("_parent_id");
  CREATE INDEX "dss_github_feed_cache_commits_order_idx" ON "dss_github_feed_cache_commits" USING btree ("_order");
  CREATE INDEX "dss_github_feed_cache_commits_parent_id_idx" ON "dss_github_feed_cache_commits" USING btree ("_parent_id");
  CREATE INDEX "dss_github_feed_cache_commits_committed_at_idx" ON "dss_github_feed_cache_commits" USING btree ("committed_at");
  CREATE INDEX "dss_github_feed_cache_warnings_order_idx" ON "dss_github_feed_cache_warnings" USING btree ("_order");
  CREATE INDEX "dss_github_feed_cache_warnings_parent_id_idx" ON "dss_github_feed_cache_warnings" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "dss_github_feed_cache_key_idx" ON "dss_github_feed_cache" USING btree ("key");
  CREATE INDEX "dss_github_feed_cache_generated_at_idx" ON "dss_github_feed_cache" USING btree ("generated_at");
  CREATE INDEX "dss_github_feed_cache_fresh_until_idx" ON "dss_github_feed_cache" USING btree ("fresh_until");
  CREATE INDEX "dss_github_feed_cache_stale_until_idx" ON "dss_github_feed_cache" USING btree ("stale_until");
  CREATE INDEX "dss_github_feed_cache_next_sync_at_idx" ON "dss_github_feed_cache" USING btree ("next_sync_at");
  CREATE INDEX "dss_github_feed_cache_updated_at_idx" ON "dss_github_feed_cache" USING btree ("updated_at");
  CREATE INDEX "dss_github_feed_cache_created_at_idx" ON "dss_github_feed_cache" USING btree ("created_at");
  CREATE INDEX "dss_instagram_feed_cache_posts_order_idx" ON "dss_instagram_feed_cache_posts" USING btree ("_order");
  CREATE INDEX "dss_instagram_feed_cache_posts_parent_id_idx" ON "dss_instagram_feed_cache_posts" USING btree ("_parent_id");
  CREATE INDEX "dss_instagram_feed_cache_posts_published_at_idx" ON "dss_instagram_feed_cache_posts" USING btree ("published_at");
  CREATE INDEX "dss_instagram_feed_cache_warnings_order_idx" ON "dss_instagram_feed_cache_warnings" USING btree ("_order");
  CREATE INDEX "dss_instagram_feed_cache_warnings_parent_id_idx" ON "dss_instagram_feed_cache_warnings" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "dss_instagram_feed_cache_key_idx" ON "dss_instagram_feed_cache" USING btree ("key");
  CREATE INDEX "dss_instagram_feed_cache_generated_at_idx" ON "dss_instagram_feed_cache" USING btree ("generated_at");
  CREATE INDEX "dss_instagram_feed_cache_fresh_until_idx" ON "dss_instagram_feed_cache" USING btree ("fresh_until");
  CREATE INDEX "dss_instagram_feed_cache_stale_until_idx" ON "dss_instagram_feed_cache" USING btree ("stale_until");
  CREATE INDEX "dss_instagram_feed_cache_next_sync_at_idx" ON "dss_instagram_feed_cache" USING btree ("next_sync_at");
  CREATE INDEX "dss_instagram_feed_cache_updated_at_idx" ON "dss_instagram_feed_cache" USING btree ("updated_at");
  CREATE INDEX "dss_instagram_feed_cache_created_at_idx" ON "dss_instagram_feed_cache" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_concurrency_key_idx" ON "payload_jobs" USING btree ("concurrency_key");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tech_stack_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_stack_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_project_versions_id_idx" ON "payload_locked_documents_rels" USING btree ("project_versions_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_blog_feedback_votes_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_feedback_votes_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_notifications_id_idx" ON "payload_locked_documents_rels" USING btree ("notifications_id");
  CREATE INDEX "payload_locked_documents_rels_dss_x_feed_cache_id_idx" ON "payload_locked_documents_rels" USING btree ("dss_x_feed_cache_id");
  CREATE INDEX "payload_locked_documents_rels_dss_github_feed_cache_id_idx" ON "payload_locked_documents_rels" USING btree ("dss_github_feed_cache_id");
  CREATE INDEX "payload_locked_documents_rels_dss_instagram_feed_cache_i_idx" ON "payload_locked_documents_rels" USING btree ("dss_instagram_feed_cache_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_footer_navigation_order_idx" ON "site_settings_footer_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_footer_navigation_parent_id_idx" ON "site_settings_footer_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "homepage_skills_section_cards_pills_order_idx" ON "homepage_skills_section_cards_pills" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_pills_parent_id_idx" ON "homepage_skills_section_cards_pills" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_details_items_order_idx" ON "homepage_skills_section_cards_details_items" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_details_items_parent_id_idx" ON "homepage_skills_section_cards_details_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_details_order_idx" ON "homepage_skills_section_cards_details" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_details_parent_id_idx" ON "homepage_skills_section_cards_details" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_workflow_order_idx" ON "homepage_skills_section_cards_workflow" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_workflow_parent_id_idx" ON "homepage_skills_section_cards_workflow" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_focus_line_order_idx" ON "homepage_skills_section_cards_focus_line" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_focus_line_parent_id_idx" ON "homepage_skills_section_cards_focus_line" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_principles_order_idx" ON "homepage_skills_section_cards_principles" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_principles_parent_id_idx" ON "homepage_skills_section_cards_principles" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_focus_items_order_idx" ON "homepage_skills_section_cards_focus_items" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_focus_items_parent_id_idx" ON "homepage_skills_section_cards_focus_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_skills_section_cards_order_idx" ON "homepage_skills_section_cards" USING btree ("_order");
  CREATE INDEX "homepage_skills_section_cards_parent_id_idx" ON "homepage_skills_section_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_delivery_pipeline_section_metrics_order_idx" ON "homepage_delivery_pipeline_section_metrics" USING btree ("_order");
  CREATE INDEX "homepage_delivery_pipeline_section_metrics_parent_id_idx" ON "homepage_delivery_pipeline_section_metrics" USING btree ("_parent_id");
  CREATE INDEX "homepage_delivery_pipeline_section_phases_items_order_idx" ON "homepage_delivery_pipeline_section_phases_items" USING btree ("_order");
  CREATE INDEX "homepage_delivery_pipeline_section_phases_items_parent_id_idx" ON "homepage_delivery_pipeline_section_phases_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_delivery_pipeline_section_phases_order_idx" ON "homepage_delivery_pipeline_section_phases" USING btree ("_order");
  CREATE INDEX "homepage_delivery_pipeline_section_phases_parent_id_idx" ON "homepage_delivery_pipeline_section_phases" USING btree ("_parent_id");
  CREATE INDEX "homepage_footer_section_x_posts_order_idx" ON "homepage_footer_section_x_posts" USING btree ("_order");
  CREATE INDEX "homepage_footer_section_x_posts_parent_id_idx" ON "homepage_footer_section_x_posts" USING btree ("_parent_id");
  CREATE INDEX "homepage_footer_section_snapshots_order_idx" ON "homepage_footer_section_snapshots" USING btree ("_order");
  CREATE INDEX "homepage_footer_section_snapshots_parent_id_idx" ON "homepage_footer_section_snapshots" USING btree ("_parent_id");
  CREATE INDEX "homepage_footer_section_snapshots_image_idx" ON "homepage_footer_section_snapshots" USING btree ("image_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_current_mission_section_current_mission_section_idx" ON "homepage" USING btree ("current_mission_section_project_id");
  CREATE INDEX "homepage_insights_trust_section_insights_trust_section_f_idx" ON "homepage" USING btree ("insights_trust_section_featured_article_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_projects_id_idx" ON "homepage_rels" USING btree ("projects_id");
  CREATE INDEX "homepage_rels_tech_stack_id_idx" ON "homepage_rels" USING btree ("tech_stack_id");
  CREATE INDEX "homepage_rels_blog_posts_id_idx" ON "homepage_rels" USING btree ("blog_posts_id");
  CREATE INDEX "homepage_rels_testimonials_id_idx" ON "homepage_rels" USING btree ("testimonials_id");
  CREATE INDEX "navigation_landing_links_order_idx" ON "navigation_landing_links" USING btree ("_order");
  CREATE INDEX "navigation_landing_links_parent_id_idx" ON "navigation_landing_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_pages_menu_items_order_idx" ON "navigation_pages_menu_items" USING btree ("_order");
  CREATE INDEX "navigation_pages_menu_items_parent_id_idx" ON "navigation_pages_menu_items" USING btree ("_parent_id");
  CREATE INDEX "about_hero_actions_order_idx" ON "about_hero_actions" USING btree ("_order");
  CREATE INDEX "about_hero_actions_parent_id_idx" ON "about_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "about_hero_signals_order_idx" ON "about_hero_signals" USING btree ("_order");
  CREATE INDEX "about_hero_signals_parent_id_idx" ON "about_hero_signals" USING btree ("_parent_id");
  CREATE INDEX "about_career_items_stack_order_idx" ON "about_career_items_stack" USING btree ("_order");
  CREATE INDEX "about_career_items_stack_parent_id_idx" ON "about_career_items_stack" USING btree ("_parent_id");
  CREATE INDEX "about_career_items_order_idx" ON "about_career_items" USING btree ("_order");
  CREATE INDEX "about_career_items_parent_id_idx" ON "about_career_items" USING btree ("_parent_id");
  CREATE INDEX "about_principles_items_order_idx" ON "about_principles_items" USING btree ("_order");
  CREATE INDEX "about_principles_items_parent_id_idx" ON "about_principles_items" USING btree ("_parent_id");
  CREATE INDEX "about_operating_system_steps_order_idx" ON "about_operating_system_steps" USING btree ("_order");
  CREATE INDEX "about_operating_system_steps_parent_id_idx" ON "about_operating_system_steps" USING btree ("_parent_id");
  CREATE INDEX "about_operating_system_current_stage_items_order_idx" ON "about_operating_system_current_stage_items" USING btree ("_order");
  CREATE INDEX "about_operating_system_current_stage_items_parent_id_idx" ON "about_operating_system_current_stage_items" USING btree ("_parent_id");
  CREATE INDEX "about_operating_system_guardrails_items_order_idx" ON "about_operating_system_guardrails_items" USING btree ("_order");
  CREATE INDEX "about_operating_system_guardrails_items_parent_id_idx" ON "about_operating_system_guardrails_items" USING btree ("_parent_id");
  CREATE INDEX "about_operating_system_outputs_items_order_idx" ON "about_operating_system_outputs_items" USING btree ("_order");
  CREATE INDEX "about_operating_system_outputs_items_parent_id_idx" ON "about_operating_system_outputs_items" USING btree ("_parent_id");
  CREATE INDEX "about_operating_system_telemetry_order_idx" ON "about_operating_system_telemetry" USING btree ("_order");
  CREATE INDEX "about_operating_system_telemetry_parent_id_idx" ON "about_operating_system_telemetry" USING btree ("_parent_id");
  CREATE INDEX "about_experience_items_order_idx" ON "about_experience_items" USING btree ("_order");
  CREATE INDEX "about_experience_items_parent_id_idx" ON "about_experience_items" USING btree ("_parent_id");
  CREATE INDEX "about_experience_summary_order_idx" ON "about_experience_summary" USING btree ("_order");
  CREATE INDEX "about_experience_summary_parent_id_idx" ON "about_experience_summary" USING btree ("_parent_id");
  CREATE INDEX "about_current_focus_cards_tags_order_idx" ON "about_current_focus_cards_tags" USING btree ("_order");
  CREATE INDEX "about_current_focus_cards_tags_parent_id_idx" ON "about_current_focus_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "about_current_focus_cards_order_idx" ON "about_current_focus_cards" USING btree ("_order");
  CREATE INDEX "about_current_focus_cards_parent_id_idx" ON "about_current_focus_cards" USING btree ("_parent_id");
  CREATE INDEX "about_personal_signals_items_order_idx" ON "about_personal_signals_items" USING btree ("_order");
  CREATE INDEX "about_personal_signals_items_parent_id_idx" ON "about_personal_signals_items" USING btree ("_parent_id");
  CREATE INDEX "about_current_focus_current_focus_primary_project_idx" ON "about" USING btree ("current_focus_primary_project_id");
  CREATE INDEX "profile_metrics_order_idx" ON "profile_metrics" USING btree ("_order");
  CREATE INDEX "profile_metrics_parent_id_idx" ON "profile_metrics" USING btree ("_parent_id");
  CREATE INDEX "profile_journey_order_idx" ON "profile_journey" USING btree ("_order");
  CREATE INDEX "profile_journey_parent_id_idx" ON "profile_journey" USING btree ("_parent_id");
  CREATE INDEX "profile_principles_order_idx" ON "profile_principles" USING btree ("_order");
  CREATE INDEX "profile_principles_parent_id_idx" ON "profile_principles" USING btree ("_parent_id");
  CREATE INDEX "profile_portrait_idx" ON "profile" USING btree ("portrait_id");
  CREATE INDEX "profile_cv_file_idx" ON "profile" USING btree ("cv_file_id");
  CREATE INDEX "public_pages_projects_cta_identity_lines_order_idx" ON "public_pages_projects_cta_identity_lines" USING btree ("_order");
  CREATE INDEX "public_pages_projects_cta_identity_lines_parent_id_idx" ON "public_pages_projects_cta_identity_lines" USING btree ("_parent_id");
  CREATE INDEX "seo_default_og_image_idx" ON "seo" USING btree ("default_og_image_id");
  CREATE INDEX "contact_page_process_steps_order_idx" ON "contact_page_process_steps" USING btree ("_order");
  CREATE INDEX "contact_page_process_steps_parent_id_idx" ON "contact_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "dss_github_feed_settings_repositories_order_idx" ON "dss_github_feed_settings_repositories" USING btree ("_order");
  CREATE INDEX "dss_github_feed_settings_repositories_parent_id_idx" ON "dss_github_feed_settings_repositories" USING btree ("_parent_id");
  CREATE INDEX "dss_github_feed_settings_monitor_events_order_idx" ON "dss_github_feed_settings_monitor_events" USING btree ("_order");
  CREATE INDEX "dss_github_feed_settings_monitor_events_parent_id_idx" ON "dss_github_feed_settings_monitor_events" USING btree ("_parent_id");
  CREATE INDEX "dss_instagram_feed_settings_monitor_events_order_idx" ON "dss_instagram_feed_settings_monitor_events" USING btree ("_order");
  CREATE INDEX "dss_instagram_feed_settings_monitor_events_parent_id_idx" ON "dss_instagram_feed_settings_monitor_events" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media_tags" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tech_stack" CASCADE;
  DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_case_study_metrics" CASCADE;
  DROP TABLE "projects_architecture_items" CASCADE;
  DROP TABLE "projects_architecture" CASCADE;
  DROP TABLE "projects_roadmap" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "project_versions_highlights" CASCADE;
  DROP TABLE "project_versions_breaking_changes" CASCADE;
  DROP TABLE "project_versions" CASCADE;
  DROP TABLE "blog_posts_key_takeaways" CASCADE;
  DROP TABLE "blog_posts_tags" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_feedback_votes" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "contact_messages" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "notifications" CASCADE;
  DROP TABLE "dss_x_feed_cache_warnings" CASCADE;
  DROP TABLE "dss_x_feed_cache" CASCADE;
  DROP TABLE "dss_github_feed_cache_repositories" CASCADE;
  DROP TABLE "dss_github_feed_cache_commits" CASCADE;
  DROP TABLE "dss_github_feed_cache_warnings" CASCADE;
  DROP TABLE "dss_github_feed_cache" CASCADE;
  DROP TABLE "dss_instagram_feed_cache_posts" CASCADE;
  DROP TABLE "dss_instagram_feed_cache_warnings" CASCADE;
  DROP TABLE "dss_instagram_feed_cache" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_footer_navigation" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "homepage_skills_section_cards_pills" CASCADE;
  DROP TABLE "homepage_skills_section_cards_details_items" CASCADE;
  DROP TABLE "homepage_skills_section_cards_details" CASCADE;
  DROP TABLE "homepage_skills_section_cards_workflow" CASCADE;
  DROP TABLE "homepage_skills_section_cards_focus_line" CASCADE;
  DROP TABLE "homepage_skills_section_cards_principles" CASCADE;
  DROP TABLE "homepage_skills_section_cards_focus_items" CASCADE;
  DROP TABLE "homepage_skills_section_cards" CASCADE;
  DROP TABLE "homepage_delivery_pipeline_section_metrics" CASCADE;
  DROP TABLE "homepage_delivery_pipeline_section_phases_items" CASCADE;
  DROP TABLE "homepage_delivery_pipeline_section_phases" CASCADE;
  DROP TABLE "homepage_footer_section_x_posts" CASCADE;
  DROP TABLE "homepage_footer_section_snapshots" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "navigation_landing_links" CASCADE;
  DROP TABLE "navigation_pages_menu_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "about_hero_actions" CASCADE;
  DROP TABLE "about_hero_signals" CASCADE;
  DROP TABLE "about_career_items_stack" CASCADE;
  DROP TABLE "about_career_items" CASCADE;
  DROP TABLE "about_principles_items" CASCADE;
  DROP TABLE "about_operating_system_steps" CASCADE;
  DROP TABLE "about_operating_system_current_stage_items" CASCADE;
  DROP TABLE "about_operating_system_guardrails_items" CASCADE;
  DROP TABLE "about_operating_system_outputs_items" CASCADE;
  DROP TABLE "about_operating_system_telemetry" CASCADE;
  DROP TABLE "about_experience_items" CASCADE;
  DROP TABLE "about_experience_summary" CASCADE;
  DROP TABLE "about_current_focus_cards_tags" CASCADE;
  DROP TABLE "about_current_focus_cards" CASCADE;
  DROP TABLE "about_personal_signals_items" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "profile_metrics" CASCADE;
  DROP TABLE "profile_journey" CASCADE;
  DROP TABLE "profile_principles" CASCADE;
  DROP TABLE "profile" CASCADE;
  DROP TABLE "public_pages_projects_cta_identity_lines" CASCADE;
  DROP TABLE "public_pages" CASCADE;
  DROP TABLE "seo" CASCADE;
  DROP TABLE "social" CASCADE;
  DROP TABLE "contact_page_process_steps" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "analytics" CASCADE;
  DROP TABLE "dss_x_feed_settings" CASCADE;
  DROP TABLE "dss_github_feed_settings_repositories" CASCADE;
  DROP TABLE "dss_github_feed_settings_monitor_events" CASCADE;
  DROP TABLE "dss_github_feed_settings" CASCADE;
  DROP TABLE "dss_instagram_feed_settings_monitor_events" CASCADE;
  DROP TABLE "dss_instagram_feed_settings" CASCADE;
  DROP TABLE "payload_jobs_stats" CASCADE;
  DROP TYPE "public"."enum_media_external_provider";
  DROP TYPE "public"."enum_categories_type";
  DROP TYPE "public"."enum_projects_highlights_icon";
  DROP TYPE "public"."enum_projects_architecture_icon";
  DROP TYPE "public"."enum_projects_roadmap_status";
  DROP TYPE "public"."enum_projects_gallery_device_frame";
  DROP TYPE "public"."enum_projects_links_type";
  DROP TYPE "public"."enum_projects_case_study_code_language";
  DROP TYPE "public"."enum_projects_stage";
  DROP TYPE "public"."enum_blog_posts_difficulty";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum_blog_feedback_votes_vote";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_contact_messages_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_notifications_type";
  DROP TYPE "public"."enum_notifications_status";
  DROP TYPE "public"."enum_notifications_related_collection";
  DROP TYPE "public"."enum_dss_x_feed_cache_source_stability";
  DROP TYPE "public"."enum_dss_instagram_feed_cache_posts_media_type";
  DROP TYPE "public"."enum_dss_instagram_feed_cache_source_mode";
  DROP TYPE "public"."enum_dss_instagram_feed_cache_source_used";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_site_settings_default_language";
  DROP TYPE "public"."enum_homepage_skills_section_cards_workflow_icon";
  DROP TYPE "public"."enum_homepage_skills_section_cards_principles_icon";
  DROP TYPE "public"."enum_homepage_skills_section_cards_focus_items_icon";
  DROP TYPE "public"."enum_homepage_skills_section_cards_key";
  DROP TYPE "public"."enum_homepage_delivery_pipeline_section_metrics_key";
  DROP TYPE "public"."enum_homepage_delivery_pipeline_section_phases_key";
  DROP TYPE "public"."enum_homepage_delivery_pipeline_section_phases_status";
  DROP TYPE "public"."enum_homepage_footer_section_snapshots_kind";
  DROP TYPE "public"."enum_navigation_landing_links_section";
  DROP TYPE "public"."enum_navigation_pages_menu_items_destination";
  DROP TYPE "public"."enum_navigation_pages_menu_items_match";
  DROP TYPE "public"."enum_navigation_cta_destination";
  DROP TYPE "public"."enum_about_hero_actions_icon";
  DROP TYPE "public"."enum_about_hero_actions_tone";
  DROP TYPE "public"."enum_about_hero_signals_source";
  DROP TYPE "public"."enum_about_principles_items_icon";
  DROP TYPE "public"."enum_about_operating_system_telemetry_tone";
  DROP TYPE "public"."enum_about_experience_items_level";
  DROP TYPE "public"."enum_about_current_focus_cards_tone";
  DROP TYPE "public"."enum_about_current_focus_cards_icon";
  DROP TYPE "public"."enum_profile_principles_icon";
  DROP TYPE "public"."enum_profile_status";
  DROP TYPE "public"."enum_seo_robots";
  DROP TYPE "public"."enum_dss_x_feed_settings_source_mode";
  DROP TYPE "public"."enum_dss_github_feed_settings_monitor_events_level";
  DROP TYPE "public"."enum_dss_github_feed_settings_monitor_status";
  DROP TYPE "public"."enum_dss_github_feed_settings_monitor_trigger";
  DROP TYPE "public"."enum_dss_instagram_feed_settings_monitor_events_level";
  DROP TYPE "public"."enum_dss_instagram_feed_settings_source_mode";
  DROP TYPE "public"."enum_dss_instagram_feed_settings_monitor_status";
  DROP TYPE "public"."enum_dss_instagram_feed_settings_monitor_trigger";`)
}
