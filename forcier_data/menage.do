********************************************************************************
********************************************************************************
********************************************************************************
*                                    MENAGE                                    *
********************************************************************************
********************************************************************************
********************************************************************************

***Set macros

*Raw data folder
global raw_data_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Raw_data
*Audit processed data folder
global audit_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Processed_data\Audit
*CODESA processed data folder
global codesa_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Processed_data\CODESA
*Menage processed data folder
global menage_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Processed_data\Menage
*Audit QC folder
global audit_QC_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Quality_control\Audit
*CODESA QC folder
global codesa_QC_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Quality_control\CODESA
*Menage QC folder
global menage_QC_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Quality_control\Menage
*Tracking folder
global tracking_folder G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\11_Reports

***get ready
clear all
set more off

cd "$raw_data_folder"

********************************************************************************
********************************************************************************
********************************************************************************
*                                 IMPORT DATA                                  *
********************************************************************************
********************************************************************************
********************************************************************************


* import_NORC-IGA-Endline-Menage.do
*
* 	Imports and aggregates "NORC-IGA-Endline-Menage" (ID: NORC-IGA-Endline-Menage) data.
*
*	Inputs:  "G:/Shared drives/IMC GEFA WASH/Wave 1/DRC/Data collection/Raw Data/Quantitative/NORC-IGA-Endline-Menage_WIDE.csv"
*	Outputs: "G:/Shared drives/IMC GEFA WASH/Wave 1/DRC/Data collection/Raw Data/Quantitative/NORC-IGA-Endline-Menage.dta"
*
*	Output by SurveyCTO November 25, 2020 1:11 AM.

* initialize Stata
clear all
set more off
set mem 100m

* initialize workflow-specific parameters
*	Set overwrite_old_data to 1 if you use the review and correction
*	workflow and allow un-approving of submissions. If you do this,
*	incoming data will overwrite old data, so you won't want to make
*	changes to data in your local .dta file (such changes can be
*	overwritten with each new import).
local overwrite_old_data 0

* initialize form-specific parameters
local csvfile "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Raw_data\NORC-IGA-Endline-Menage_WIDE.csv"
local dtafile "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Processed_data\Menage\NORC-IGA-Endline-Menage.dta"
local corrfile "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\9_Data\Raw_data\NORC-IGA-Endline-Menage_corrections.csv"
local note_fields1 ""
local text_fields1 "deviceid subscriberid audit_text today_date start_tracking_time start_tracking_duration1 start_tracking_duration2 q10 q14_other hhid b_respondent_surname b_respondent_firstname"
local text_fields2 "b_respondent_surname_firstname b_resp_gender b_resp_age b_resp_lat b_resp_long b_resp_gps resp_dist_bw a4_note a5_text a6_no_refuse a6_no_other a7_other a7_label a9_1 a9_2 a9_3 a10_2_sp a11 a14"
local text_fields3 "a14_other a21 a23 a23_other a24_text a24b_other a24b_refused_reason a25_fix end_tracking_time end_tracking_duration1 end_tracking_duration2 start_consent_time start_consent_duration1"
local text_fields4 "start_consent_duration2 q12_label end_consent_time end_consent_duration1 end_consent_duration2 start_conjoint_time start_conjoint_duration1 start_conjoint_duration2 language _120_1_1_permutation"
local text_fields5 "_120_1_1_sixteenth_set_key _120_1_1_t_comb_count_1 _120_1_1_t_comb_count_2 _120_1_1_t_comb_count_3 _120_1_1_t_comb_count_4 _120_1_1_t_comb_count_5 _120_1_1_comb_count_1 _120_1_1_set_key1"
local text_fields6 "_120_1_1_first_perm_att _120_1_1_first_char_a _120_1_1_first_char_b _120_1_1_comb_count_2 _120_1_1_set_key2 _120_1_1_second_perm_att _120_1_1_second_char_a _120_1_1_second_char_b _120_1_1_comb_count_3"
local text_fields7 "_120_1_1_set_key3 _120_1_1_third_perm_att _120_1_1_third_char_a _120_1_1_third_char_b _120_1_1_comb_count_4 _120_1_1_set_key4 _120_1_1_fourth_perm_att _120_1_1_fourth_char_a _120_1_1_fourth_char_b"
local text_fields8 "_120_1_1_comb_count_5 _120_1_1_set_key5 _120_1_1_fifth_perm_att _120_1_1_fifth_char_a _120_1_1_fifth_char_b _120_1_2_permutation _120_1_2_sixteenth_set_key _120_1_2_t_comb_count_1"
local text_fields9 "_120_1_2_t_comb_count_2 _120_1_2_t_comb_count_3 _120_1_2_t_comb_count_4 _120_1_2_t_comb_count_5 _120_1_2_comb_count_1 _120_1_2_set_key1 _120_1_2_first_perm_att _120_1_2_first_char_a"
local text_fields10 "_120_1_2_first_char_b _120_1_2_comb_count_2 _120_1_2_set_key2 _120_1_2_second_perm_att _120_1_2_second_char_a _120_1_2_second_char_b _120_1_2_comb_count_3 _120_1_2_set_key3 _120_1_2_third_perm_att"
local text_fields11 "_120_1_2_third_char_a _120_1_2_third_char_b _120_1_2_comb_count_4 _120_1_2_set_key4 _120_1_2_fourth_perm_att _120_1_2_fourth_char_a _120_1_2_fourth_char_b _120_1_2_comb_count_5 _120_1_2_set_key5"
local text_fields12 "_120_1_2_fifth_perm_att _120_1_2_fifth_char_a _120_1_2_fifth_char_b _120_1_dup_check _120_2_1_permutation _120_2_1_sixteenth_set_key _120_2_1_t_comb_count_1 _120_2_1_t_comb_count_2"
local text_fields13 "_120_2_1_t_comb_count_3 _120_2_1_t_comb_count_4 _120_2_1_t_comb_count_5 _120_2_1_comb_count_1 _120_2_1_set_key1 _120_2_1_first_perm_att _120_2_1_first_char_a _120_2_1_first_char_b"
local text_fields14 "_120_2_1_comb_count_2 _120_2_1_set_key2 _120_2_1_second_perm_att _120_2_1_second_char_a _120_2_1_second_char_b _120_2_1_comb_count_3 _120_2_1_set_key3 _120_2_1_third_perm_att _120_2_1_third_char_a"
local text_fields15 "_120_2_1_third_char_b _120_2_1_comb_count_4 _120_2_1_set_key4 _120_2_1_fourth_perm_att _120_2_1_fourth_char_a _120_2_1_fourth_char_b _120_2_1_comb_count_5 _120_2_1_set_key5 _120_2_1_fifth_perm_att"
local text_fields16 "_120_2_1_fifth_char_a _120_2_1_fifth_char_b _120_2_2_permutation _120_2_2_sixteenth_set_key _120_2_2_t_comb_count_1 _120_2_2_t_comb_count_2 _120_2_2_t_comb_count_3 _120_2_2_t_comb_count_4"
local text_fields17 "_120_2_2_t_comb_count_5 _120_2_2_comb_count_1 _120_2_2_set_key1 _120_2_2_first_perm_att _120_2_2_first_char_a _120_2_2_first_char_b _120_2_2_comb_count_2 _120_2_2_set_key2 _120_2_2_second_perm_att"
local text_fields18 "_120_2_2_second_char_a _120_2_2_second_char_b _120_2_2_comb_count_3 _120_2_2_set_key3 _120_2_2_third_perm_att _120_2_2_third_char_a _120_2_2_third_char_b _120_2_2_comb_count_4 _120_2_2_set_key4"
local text_fields19 "_120_2_2_fourth_perm_att _120_2_2_fourth_char_a _120_2_2_fourth_char_b _120_2_2_comb_count_5 _120_2_2_set_key5 _120_2_2_fifth_perm_att _120_2_2_fifth_char_a _120_2_2_fifth_char_b _120_2_dup_check"
local text_fields20 "_120_3_1_permutation _120_3_1_sixteenth_set_key _120_3_1_t_comb_count_1 _120_3_1_t_comb_count_2 _120_3_1_t_comb_count_3 _120_3_1_t_comb_count_4 _120_3_1_t_comb_count_5 _120_3_1_comb_count_1"
local text_fields21 "_120_3_1_set_key1 _120_3_1_first_perm_att _120_3_1_first_char_a _120_3_1_first_char_b _120_3_1_comb_count_2 _120_3_1_set_key2 _120_3_1_second_perm_att _120_3_1_second_char_a _120_3_1_second_char_b"
local text_fields22 "_120_3_1_comb_count_3 _120_3_1_set_key3 _120_3_1_third_perm_att _120_3_1_third_char_a _120_3_1_third_char_b _120_3_1_comb_count_4 _120_3_1_set_key4 _120_3_1_fourth_perm_att _120_3_1_fourth_char_a"
local text_fields23 "_120_3_1_fourth_char_b _120_3_1_comb_count_5 _120_3_1_set_key5 _120_3_1_fifth_perm_att _120_3_1_fifth_char_a _120_3_1_fifth_char_b _120_3_2_permutation _120_3_2_sixteenth_set_key"
local text_fields24 "_120_3_2_t_comb_count_1 _120_3_2_t_comb_count_2 _120_3_2_t_comb_count_3 _120_3_2_t_comb_count_4 _120_3_2_t_comb_count_5 _120_3_2_comb_count_1 _120_3_2_set_key1 _120_3_2_first_perm_att"
local text_fields25 "_120_3_2_first_char_a _120_3_2_first_char_b _120_3_2_comb_count_2 _120_3_2_set_key2 _120_3_2_second_perm_att _120_3_2_second_char_a _120_3_2_second_char_b _120_3_2_comb_count_3 _120_3_2_set_key3"
local text_fields26 "_120_3_2_third_perm_att _120_3_2_third_char_a _120_3_2_third_char_b _120_3_2_comb_count_4 _120_3_2_set_key4 _120_3_2_fourth_perm_att _120_3_2_fourth_char_a _120_3_2_fourth_char_b _120_3_2_comb_count_5"
local text_fields27 "_120_3_2_set_key5 _120_3_2_fifth_perm_att _120_3_2_fifth_char_a _120_3_2_fifth_char_b _120_3_dup_check _720_1_1_permutation _720_1_1_sixteenth_set_key _720_1_1_t_comb_count_1 _720_1_1_t_comb_count_2"
local text_fields28 "_720_1_1_t_comb_count_3 _720_1_1_t_comb_count_4 _720_1_1_t_comb_count_5 _720_1_1_t_comb_count_6 _720_1_1_comb_count_1 _720_1_1_set_key1 _720_1_1_first_perm_att _720_1_1_first_char_a"
local text_fields29 "_720_1_1_first_char_b _720_1_1_comb_count_2 _720_1_1_set_key2 _720_1_1_second_perm_att _720_1_1_second_char_a _720_1_1_second_char_b _720_1_1_comb_count_3 _720_1_1_set_key3 _720_1_1_third_perm_att"
local text_fields30 "_720_1_1_third_char_a _720_1_1_third_char_b _720_1_1_comb_count_4 _720_1_1_set_key4 _720_1_1_fourth_perm_att _720_1_1_fourth_char_a _720_1_1_fourth_char_b _720_1_1_comb_count_5 _720_1_1_set_key5"
local text_fields31 "_720_1_1_fifth_perm_att _720_1_1_fifth_char_a _720_1_1_fifth_char_b _720_1_1_comb_count_6 _720_1_1_set_key6 _720_1_1_sixth_perm_att _720_1_1_sixth_char_a _720_1_1_sixth_char_b _720_1_2_permutation"
local text_fields32 "_720_1_2_sixteenth_set_key _720_1_2_t_comb_count_1 _720_1_2_t_comb_count_2 _720_1_2_t_comb_count_3 _720_1_2_t_comb_count_4 _720_1_2_t_comb_count_5 _720_1_2_t_comb_count_6 _720_1_2_comb_count_1"
local text_fields33 "_720_1_2_set_key1 _720_1_2_first_perm_att _720_1_2_first_char_a _720_1_2_first_char_b _720_1_2_comb_count_2 _720_1_2_set_key2 _720_1_2_second_perm_att _720_1_2_second_char_a _720_1_2_second_char_b"
local text_fields34 "_720_1_2_comb_count_3 _720_1_2_set_key3 _720_1_2_third_perm_att _720_1_2_third_char_a _720_1_2_third_char_b _720_1_2_comb_count_4 _720_1_2_set_key4 _720_1_2_fourth_perm_att _720_1_2_fourth_char_a"
local text_fields35 "_720_1_2_fourth_char_b _720_1_2_comb_count_5 _720_1_2_set_key5 _720_1_2_fifth_perm_att _720_1_2_fifth_char_a _720_1_2_fifth_char_b _720_1_2_comb_count_6 _720_1_2_set_key6 _720_1_2_sixth_perm_att"
local text_fields36 "_720_1_2_sixth_char_a _720_1_2_sixth_char_b _720_1_dup_check _720_2_1_permutation _720_2_1_sixteenth_set_key _720_2_1_t_comb_count_1 _720_2_1_t_comb_count_2 _720_2_1_t_comb_count_3"
local text_fields37 "_720_2_1_t_comb_count_4 _720_2_1_t_comb_count_5 _720_2_1_t_comb_count_6 _720_2_1_comb_count_1 _720_2_1_set_key1 _720_2_1_first_perm_att _720_2_1_first_char_a _720_2_1_first_char_b"
local text_fields38 "_720_2_1_comb_count_2 _720_2_1_set_key2 _720_2_1_second_perm_att _720_2_1_second_char_a _720_2_1_second_char_b _720_2_1_comb_count_3 _720_2_1_set_key3 _720_2_1_third_perm_att _720_2_1_third_char_a"
local text_fields39 "_720_2_1_third_char_b _720_2_1_comb_count_4 _720_2_1_set_key4 _720_2_1_fourth_perm_att _720_2_1_fourth_char_a _720_2_1_fourth_char_b _720_2_1_comb_count_5 _720_2_1_set_key5 _720_2_1_fifth_perm_att"
local text_fields40 "_720_2_1_fifth_char_a _720_2_1_fifth_char_b _720_2_1_comb_count_6 _720_2_1_set_key6 _720_2_1_sixth_perm_att _720_2_1_sixth_char_a _720_2_1_sixth_char_b _720_2_2_permutation _720_2_2_sixteenth_set_key"
local text_fields41 "_720_2_2_t_comb_count_1 _720_2_2_t_comb_count_2 _720_2_2_t_comb_count_3 _720_2_2_t_comb_count_4 _720_2_2_t_comb_count_5 _720_2_2_t_comb_count_6 _720_2_2_comb_count_1 _720_2_2_set_key1"
local text_fields42 "_720_2_2_first_perm_att _720_2_2_first_char_a _720_2_2_first_char_b _720_2_2_comb_count_2 _720_2_2_set_key2 _720_2_2_second_perm_att _720_2_2_second_char_a _720_2_2_second_char_b _720_2_2_comb_count_3"
local text_fields43 "_720_2_2_set_key3 _720_2_2_third_perm_att _720_2_2_third_char_a _720_2_2_third_char_b _720_2_2_comb_count_4 _720_2_2_set_key4 _720_2_2_fourth_perm_att _720_2_2_fourth_char_a _720_2_2_fourth_char_b"
local text_fields44 "_720_2_2_comb_count_5 _720_2_2_set_key5 _720_2_2_fifth_perm_att _720_2_2_fifth_char_a _720_2_2_fifth_char_b _720_2_2_comb_count_6 _720_2_2_set_key6 _720_2_2_sixth_perm_att _720_2_2_sixth_char_a"
local text_fields45 "_720_2_2_sixth_char_b _720_2_dup_check _720_3_1_permutation _720_3_1_sixteenth_set_key _720_3_1_t_comb_count_1 _720_3_1_t_comb_count_2 _720_3_1_t_comb_count_3 _720_3_1_t_comb_count_4"
local text_fields46 "_720_3_1_t_comb_count_5 _720_3_1_t_comb_count_6 _720_3_1_comb_count_1 _720_3_1_set_key1 _720_3_1_first_perm_att _720_3_1_first_char_a _720_3_1_first_char_b _720_3_1_comb_count_2 _720_3_1_set_key2"
local text_fields47 "_720_3_1_second_perm_att _720_3_1_second_char_a _720_3_1_second_char_b _720_3_1_comb_count_3 _720_3_1_set_key3 _720_3_1_third_perm_att _720_3_1_third_char_a _720_3_1_third_char_b _720_3_1_comb_count_4"
local text_fields48 "_720_3_1_set_key4 _720_3_1_fourth_perm_att _720_3_1_fourth_char_a _720_3_1_fourth_char_b _720_3_1_comb_count_5 _720_3_1_set_key5 _720_3_1_fifth_perm_att _720_3_1_fifth_char_a _720_3_1_fifth_char_b"
local text_fields49 "_720_3_1_comb_count_6 _720_3_1_set_key6 _720_3_1_sixth_perm_att _720_3_1_sixth_char_a _720_3_1_sixth_char_b _720_3_2_permutation _720_3_2_sixteenth_set_key _720_3_2_t_comb_count_1"
local text_fields50 "_720_3_2_t_comb_count_2 _720_3_2_t_comb_count_3 _720_3_2_t_comb_count_4 _720_3_2_t_comb_count_5 _720_3_2_t_comb_count_6 _720_3_2_comb_count_1 _720_3_2_set_key1 _720_3_2_first_perm_att"
local text_fields51 "_720_3_2_first_char_a _720_3_2_first_char_b _720_3_2_comb_count_2 _720_3_2_set_key2 _720_3_2_second_perm_att _720_3_2_second_char_a _720_3_2_second_char_b _720_3_2_comb_count_3 _720_3_2_set_key3"
local text_fields52 "_720_3_2_third_perm_att _720_3_2_third_char_a _720_3_2_third_char_b _720_3_2_comb_count_4 _720_3_2_set_key4 _720_3_2_fourth_perm_att _720_3_2_fourth_char_a _720_3_2_fourth_char_b _720_3_2_comb_count_5"
local text_fields53 "_720_3_2_set_key5 _720_3_2_fifth_perm_att _720_3_2_fifth_char_a _720_3_2_fifth_char_b _720_3_2_comb_count_6 _720_3_2_set_key6 _720_3_2_sixth_perm_att _720_3_2_sixth_char_a _720_3_2_sixth_char_b"
local text_fields54 "_720_3_dup_check end_conjoint_time end_conjoint_duration1 end_conjoint_duration2 start_hhroster_time start_hhroster_duration1 start_hhroster_duration2 q101b q101a q106_other q107b q107a"
local text_fields55 "members_repeat_1_count resp_pos_mem_* q110a_* hhmem_lt5_* hhmem_lt5_name_* hhmem_lt5_age_* hhmem_lt5_gender_* hhmem_w_* under5childrenroster hhmem_lt5_name_joined hhmem_lt5_age_joined"
local text_fields56 "hhmem_lt5_gender_joined hhmem_w_name_joined hhmem_w_age_joined hhmem_gt4_name_joined count_names name_1 name_2 name_3 name_4 name_5 name_6 name_7 name_8 name_9 name_10 name_11 name_12 name_13 name_14"
local text_fields57 "name_15 name_16 name_17 name_18 name_19 name_20 resp_age_1 resp_age_2 resp_age_3 resp_age_4 resp_age_5 resp_age_6 resp_age_7 resp_age_8 resp_age_9 resp_age_10 resp_age_11 resp_age_12 resp_age_13"
local text_fields58 "resp_age_14 resp_age_15 resp_age_16 resp_age_17 resp_age_18 resp_age_19 resp_age_20 count_names_w name_w_1 name_w_2 name_w_3 name_w_4 name_w_5 name_w_6 name_w_7 name_w_8 name_w_9 name_w_10 name_w_11"
local text_fields59 "name_w_12 name_w_13 name_w_14 name_w_15 name_w_16 name_w_17 name_w_18 name_w_19 name_w_20 resp_age_w_1 resp_age_w_2 resp_age_w_3 resp_age_w_4 resp_age_w_5 resp_age_w_6 resp_age_w_7 resp_age_w_8"
local text_fields60 "resp_age_w_9 resp_age_w_10 resp_age_w_11 resp_age_w_12 resp_age_w_13 resp_age_w_14 resp_age_w_15 resp_age_w_16 resp_age_w_17 resp_age_w_18 resp_age_w_19 resp_age_w_20 count_names_gt4 name_gt4_1"
local text_fields61 "name_gt4_2 name_gt4_3 name_gt4_4 name_gt4_5 name_gt4_6 name_gt4_7 name_gt4_8 name_gt4_9 name_gt4_10 name_gt4_11 name_gt4_12 name_gt4_13 name_gt4_14 name_gt4_15 name_gt4_16 name_gt4_17 name_gt4_18"
local text_fields62 "name_gt4_19 name_gt4_20 count_choices_child q115b begin_repeat_child_count current_name_label_* current_child_age_* child_year1_* child_year2_* child_actual_year_* child_month_* end_hhroster_time_*"
local text_fields63 "end_hhroster_duration1_* end_hhroster_duration2_* cal2 q117hasyes_count pos_check_* name_check_* yes_check_* dependent_yes_* start_vaccination_time_* start_vaccination_duration1_*"
local text_fields64 "start_vaccination_duration2_* q220_* q220a_* q223_* q223a_* q223b_* q229_* q229a_* q230a_* q232_* q232a_* end_vaccination_time_* end_vaccination_duration1_* end_vaccination_duration2_*"
local text_fields65 "start_women_time start_women_duration1 start_women_duration2 hhmem_total_w pregnant2_time_stamp pregnant2_time_stamp_duration1 pregnant2_time_stamp_duration2 q302_total pregnant_count_count preg_pos_*"
local text_fields66 "q303_* preg_name1 preg_name2 preg_name3 preg_name4 preg_name5 preg_name6 preg_name7 preg_name8 preg_select_name1 preg_select_name2 preg_avail_name_num preg_select_name q304_month_to_week"
local text_fields67 "q304_total_weeks q307 q307a q308 q308a q309 q309a q310_month_to_week q310_total_weeks pregnant3_time_stamp pregnant3_time_stamp_duration1 pregnant3_time_stamp_duration2 births_count_count gbirth_pos_*"
local text_fields68 "q321_* birth_name1 birth_name2 birth_name3 birth_name4 birth_name5 birth_name6 birth_name7 birth_name8 birth_select_name1 birth_select_name2 birth_avail_name_num birth_select_name birth_select_num"
local text_fields69 "birth_day birth_month birth_year q325 q325a q326 q326a q327 q327a q328_month_to_week q337a q341a q342a end_women_time end_women_duration1 end_women_duration2 start_infant_time start_infant_duration1"
local text_fields70 "start_infant_duration2 start_404406_count resp_pos_403_* q402_* start_409412_count resp_pos_408_* q407_* start_415421_count resp_pos_414_* q415_* end_infant_time_* end_infant_duration1_*"
local text_fields71 "end_infant_duration2_* start_hhhealth_time start_hhhealth_duration1 start_hhhealth_duration2 q502b q502c_label q508 q508_other family_time_stamp family_time_stamp_duration1 family_time_stamp_duration2"
local text_fields72 "family2_time_stamp family2_time_stamp_duration1 family2_time_stamp_duration2 q514 q514_other q516 q525 q525_other family3_time_stamp family3_time_stamp_duration1 family3_time_stamp_duration2 q537"
local text_fields73 "q537_other q555_name end_hhhealth_time end_hhhealth_duration1 end_hhhealth_duration2 start_codesa_time start_codesa_duration1 start_codesa_duration2 q708_name q702 q702_other codesa2_time_stamp"
local text_fields74 "codesa2_time_stamp_duration1 codesa2_time_stamp_duration2 q713 q714k q714k_a q714k_b q714k_c end_codesa_time end_codesa_duration1 end_codesa_duration2 start_civil_time start_civil_duration1"
local text_fields75 "start_civil_duration2 end_civil_time end_civil_duration1 end_civil_duration2 start_demo_time start_demo_duration1 start_demo_duration2 q907_other q908_other q910_autre q913_other q915 q915_other q916"
local text_fields76 "q916_other migration1a migration1b migration1c migration2a migration2b migration2c migration3a migration3b end_demo_time end_demo_duration1 end_demo_duration2 start_final_time start_final_duration1"
local text_fields77 "start_final_duration2 itwer2_time_stamp itwer2_time_stamp_duration1 itwer2_time_stamp_duration2 s1_15_2_other q15_refuse q1001_other q1002_c_other q1009_other q1010 end_final_time end_final_duration1"
local text_fields78 "end_final_duration2 end_time end_time_duration1 end_time_duration2 duration_itw instanceid"
local date_fields1 ""
local datetime_fields1 "submissiondate start end sys_starttime"

disp
disp "Starting import of: `csvfile'"
disp

* import data from primary .csv file
insheet using "`csvfile'", names clear

* drop extra table-list columns
cap drop reserved_name_for_field_*
cap drop generated_table_list_lab*

* continue only if there's at least one row of data to import
if _N>0 {
	* drop note fields (since they don't contain any real data)
	forvalues i = 1/100 {
		if "`note_fields`i''" ~= "" {
			drop `note_fields`i''
		}
	}
	
	* format date and date/time fields
	forvalues i = 1/100 {
		if "`datetime_fields`i''" ~= "" {
			foreach dtvarlist in `datetime_fields`i'' {
				cap unab dtvarlist : `dtvarlist'
				if _rc==0 {
					foreach dtvar in `dtvarlist' {
						tempvar tempdtvar
						rename `dtvar' `tempdtvar'
						gen double `dtvar'=.
						cap replace `dtvar'=clock(`tempdtvar',"MDYhms",2025)
						* automatically try without seconds, just in case
						cap replace `dtvar'=clock(`tempdtvar',"MDYhm",2025) if `dtvar'==. & `tempdtvar'~=""
						format %tc `dtvar'
						drop `tempdtvar'
					}
				}
			}
		}
		if "`date_fields`i''" ~= "" {
			foreach dtvarlist in `date_fields`i'' {
				cap unab dtvarlist : `dtvarlist'
				if _rc==0 {
					foreach dtvar in `dtvarlist' {
						tempvar tempdtvar
						rename `dtvar' `tempdtvar'
						gen double `dtvar'=.
						cap replace `dtvar'=date(`tempdtvar',"MDY",2025)
						format %td `dtvar'
						drop `tempdtvar'
					}
				}
			}
		}
	}

	* ensure that text fields are always imported as strings (with "" for missing values)
	* (note that we treat "calculate" fields as text; you can destring later if you wish)
	tempvar ismissingvar
	quietly: gen `ismissingvar'=.
	forvalues i = 1/100 {
		if "`text_fields`i''" ~= "" {
			foreach svarlist in `text_fields`i'' {
				cap unab svarlist : `svarlist'
				if _rc==0 {
					foreach stringvar in `svarlist' {
						quietly: replace `ismissingvar'=.
						quietly: cap replace `ismissingvar'=1 if `stringvar'==.
						cap tostring `stringvar', format(%100.0g) replace
						cap replace `stringvar'="" if `ismissingvar'==1
					}
				}
			}
		}
	}
	quietly: drop `ismissingvar'


	* consolidate unique ID into "key" variable
	replace key=instanceid if key==""
	drop instanceid


	* label variables
	label variable key "Unique submission ID"
	cap label variable submissiondate "Date/time submitted"
	cap label variable formdef_version "Form version used on device"
	cap label variable review_status "Review status"
	cap label variable review_comments "Comments made during review"
	cap label variable review_corrections "Corrections made during review"


	label variable q7 "2. Province"
	note q7: "2. Province"
	label define q7 1 "Sud Kivu" 2 "Haut Katanga"
	label values q7 q7

	label variable q7_1 "7.1. Territory"
	note q7_1: "7.1. Territory"
	label define q7_1 1 "Kalehe-Bunyakiri" 7 "Kambove" 6 "Kasenga" 5 "Kipushi" 8 "Mitwaba" 3 "Mwenga" 2 "Walungu"
	label values q7_1 q7_1

	label variable q8 "3. Zone de Santé"
	note q8: "3. Zone de Santé"
	label define q8 1 "Bunyakiri Zone de Sante" 9 "Kafubu Zone de Sante" 2 "Kalonge Zone de Sante" 11 "Kambove Zone de Sante" 16 "Kamituga Zone de Sante" 5 "Kaniola Zone de Sante" 12 "Kapolowe Zone de Sante" 4 "Kaziba Zone de Sante" 13 "Kilela Balanda Zone de Sante" 17 "Kitutu Zone de Sante" 10 "Lukafu Zone de Sante" 3 "Minova Zone de Sante" 14 "Mitwaba Zone de Sante" 15 "Mufunga Sampwe Zone de Sante" 6 "Mwana Zone de Sante" 7 "Mwenga Zone de Sante"
	label values q8 q8

	label variable q9 "4. Aire de Santé:"
	note q9: "4. Aire de Santé:"
	label define q9 1 "Bagana Aire de Sante" 2 "Bitobolo Aire de Sante" 3 "Chabunda Aire de Sante" 4 "Chinganda Aire de Sante" 5 "Ciriba Aire de Sante" 6 "Fumya Aire de Sante" 7 "Irangi Aire de Sante" 8 "Kachiri Aire de Sante" 9 "Kusisa Aire de Sante" 10 "Lwana Aire de Sante" 11 "Maibano Aire de Sante" 12 "Makuta Aire de Sante" 13 "Mangaa Aire de Sante" 14 "Matutira Aire de Sante" 15 "Mianda Aire de Sante" 16 "Mingazi Aire de Sante" 17 "Miowe Aire de Sante" 18 "Mulonge Aire de Sante" 19 "Muoma Aire de Sante" 20 "Mushunguti Aire de Sante" 21 "Tushunguti Aire de Sante" 22 "Bisisi Aire de Sante" 23 "Bumoga Aire de Sante" 24 "Chaminunu Aire de Sante" 25 "Chega Aire de Sante" 26 "Chibinda Aire de Sante" 27 "Chigiri Aire de Sante" 28 "Cholobera Aire de Sante" 29 "Fendula Aire de Sante" 30 "Kachuba Aire de Sante" 31 "Kakunda Aire de Sante" 32 "Kashesha Aire de Sante" 33 "Mukaba Aire de Sante" 34 "Mule Aire de Sante" 35 "Ntulu Aire de Sante" 36 "Rambo Aire de Sante" 37 "Rwamikundu Aire de Sante" 38 "Buhumba Aire de Sante" 39 "Bwisha Aire de Sante" 40 "Chebumba Aire de Sante" 41 "Karango Aire de Sante" 42 "Kishinji Aire de Sante" 43 "Kisongati Aire de Sante" 44 "Lumbishi Aire de Sante" 45 "Minova Aire de Sante" 46 "Muchibwe Aire de Sante" 47 "Nyamasasa Aire de Sante" 48 "Ruhunde Aire de Sante" 49 "Shanje Aire de Sante" 50 "Budoodo Aire de Sante" 51 "Cagala Aire de Sante" 52 "Culwe Aire de Sante" 53 "Izege Aire de Sante" 54 "Luhago Aire de Sante" 55 "Luntukulu Aire de Sante" 56 "Mudirhi Aire de Sante" 57 "Murhali Aire de Sante" 58 "Mwirama Aire de Sante" 59 "Nindja Aire de Sante" 60 "Nyamarhege Aire de Sante" 61 "Buzonga Aire de Sante" 62 "Cibanda Aire de Sante" 63 "Ciburhi Kaz Aire de Sante" 64 "Cihumba Aire de Sante" 65 "Cirimiro Aire de Sante" 66 "Kafindjo Aire de Sante" 67 "Kasheke Aire de Sante" 68 "Lubanda Kar Aire de Sante" 69 "Mushenyi Aire de Sante" 70 "Namushwaga Aire de Sante" 71 "Ngali Aire de Sante" 72 "Ntagereka Aire de Sante" 74 "Ciburhi Aire de Sante" 75 "Karhala Aire de Sante" 76 "Kimalanjala Aire de Sante" 77 "Luciga Aire de Sante" 78 "Lurhala Aire de Sante" 79 "Mugamba Aire de Sante" 80 "Mulama Aire de Sante" 81 "Ntondo Aire de Sante" 82 "Bisembe Aire de Sante" 83 "Buziba Aire de Sante" 84 "Iganda Aire de Sante" 85 "Kasika Aire de Sante" 86 "Kibanda Aire de Sante" 87 "Kitagana Aire de Sante" 88 "Kitamba Aire de Sante" 89 "Mbobole Aire de Sante" 90 "Mulombozi Aire de Sante" 91 "Ngando Aire de Sante" 92 "Sungwe Aire de Sante" 107 "Adra 31 Aire de Sante" 108 "Kafubu Aire de Sante" 109 "Kalunda Aire de Sante" 110 "Kinama Aire de Sante" 111 "Kitanda Aire de Sante" 112 "Kiwele Aire de Sante" 113 "Mulyashi Aire de Sante" 114 "Sambwa Aire de Sante" 115 "Kyenge Aire de Sante" 116 "Lubuko Aire de Sante" 117 "Lutandula Lwalala Aire de Sante" 118 "Malambwe Aire de Sante" 119 "Minga Aire de Sante" 120 "Mupanda Mukenge Aire de Sante" 121 "Mwemena Aire de Sante" 122 "Nkonko Aire de Sante" 123 "Dikula Aire de Sante" 124 "Disanga 2 Aire de Sante" 125 "Disanga 3 Aire de Sante" 126 "Kyaba Aire de Sante" 127 "Mpande Aire de Sante" 128 "Mukumbi Aire de Sante" 129 "Mulungwishi Aire de Sante" 130 "Kapulwa Aire de Sante" 131 "Katobio Aire de Sante" 132 "Kibangu Aire de Sante" 133 "Kidimudilo Aire de Sante" 134 "Kyembe 1 Aire de Sante" 135 "Lupidi1 Aire de Sante" 136 "Mulandi Aire de Sante" 137 "Ditengwa Aire de Sante" 138 "Kaluwe Aire de Sante" 139 "Kamikolo Aire de Sante" 140 "Lupaji Aire de Sante" 142 "Ngalu Aire de Sante" 143 "Shamalenge Aire de Sante" 144 "Dilenge Aire de Sante" 145 "Kabanda Aire de Sante" 146 "Kanshimba Aire de Sante" 147 "Kasungeshi 1 Aire de Sante" 148 "Kibula Aire de Sante" 150 "Kisele Aire de Sante" 151 "Kwiyongo Aire de Sante" 152 "Lusinga Aire de Sante" 153 "Mubidi Aire de Sante" 154 "Mumbolo Aire de Sante" 155 "Muombe Aire de Sante" 156 "Mwema Aire de Sante" 157 "Nkonga Aire de Sante" 158 "Nsokelwa Aire de Sante" 159 "Dikulwe Aire de Sante" 160 "Kalera Aire de Sante" 161 "Kapoya Aire de Sante" 162 "Kasungami Aire de Sante" 163 "Katala Aire de Sante" 164 "Kimungu Aire de Sante" 165 "Kitobo Aire de Sante" 166 "Lwika Aire de Sante" 167 "Lwishi Aire de Sante" 168 "Mpwaki Aire de Sante" 169 "Mufunga Aire de Sante" 170 "Mukana Aire de Sante" 171 "Mushiza Aire de Sante" 172 "Muvule Aire de Sante" 173 "Nsangwa Aire de Sante" 174 "Sumpwa Aire de Sante" 175 "Tomombo Aire de Sante" 176 "Toyota Aire de Sante" 177 "Kankanga Aire de Sante" 178 "Katunga Aire de Sante" 179 "Kigalama Aire de Sante" 180 "Mboza Aire de Sante" 181 "Ngambwa Aire de Sante" 182 "Bungalama Aire de Sante" 183 "Isopo Aire de Sante" 184 "Kele CEPAC Aire de Sante" 185 "Ngolole Aire de Sante" 186 "Matebo Aire de Sante" 187 "Butetegele Aire de Sante" 188 "Byonga Aire de Sante" 189 "Isogha Aire de Sante" 190 "Kazuza Aire de Sante" 191 "Bakongo Aire de Sante" 192 "Busakizi Aire de Sante" 193 "Kabikokole Aire de Sante" 194 "Kagelagela Aire de Sante" 195 "Mapale Aire de Sante" 196 "Mela Aire de Sante" 197 "Mukemenge Aire de Sante" 198 "Nyakatulo Aire de Sante" 199 "Tukenga Aire de Sante"
	label values q9 q9

	label variable q10 "5. Village:"
	note q10: "5. Village:"

	label variable q6 "1. Field Supervisor’s Name:"
	note q6: "1. Field Supervisor’s Name:"
	label define q6 110 "Irenge Kabalama Innocent" 120 "Kahasha Mapendo Chancy" 130 "Ntererwa Muvunyi Marie-Paul" 210 "Musasa Kazadi Landry" 220 "Kasongo Ngoy Mwenge Don de Dieu"
	label values q6 q6

	label variable q12 "7. Enumerator Name:"
	note q12: "7. Enumerator Name:"
	label define q12 111 "Maimouna Habimana Jolie" 112 "Zawadi Josline" 113 "Cimanuka Arssene" 114 "Justin Salimbasi" 115 "Kiriza Isaac" 116 "Ahadi Basimine Norbert" 121 "Grace Maka Anuarite" 122 "Bishikwabo Yvette" 123 "Kindja Thérèse" 124 "Bujiriri Sheria Gustave" 125 "Heri Mulengero James" 126 "Birindwa Bireke Richard" 131 "Mugisho Justin" 132 "Cubaka Joseph" 133 "Bukomare Shauri" 134 "Mirindi Patrice" 135 "Sifa Francine" 136 "Shabani Patrick" 211 "Bokula Balili Gloire" 212 "Ndumbulu Katula Nancy" 213 "Lobilo Bikoko" 214 "Kabeya Katende Aaron Sylvain" 215 "Ilunga Deborah" 216 "Ramazani Claudine" 221 "Ebondo Sarah" 222 "Mangi Wende Sandrine" 223 "Mbuyu Blandine" 224 "Mwanza Angel" 225 "Mboyo Mulamba Esther" 226 "Kabwe KAHYA NGOIE Becky"
	label values q12 q12

	label variable q14 "9. What language is the interview being done in?"
	note q14: "9. What language is the interview being done in?"
	label define q14 1 "Swahili - South Kivu" 2 "Swahili - Haut Katanga" 3 "French" 4 "Mashi" -97 "Other, specify:"
	label values q14 q14

	label variable q14_other "Other, specify"
	note q14_other: "Other, specify"

	label variable a1 "A1. Are you attempting to interview a household that was previously interviewed "
	note a1: "A1. Are you attempting to interview a household that was previously interviewed (that is, a 'panel household')?"
	label define a1 1 "Yes" 2 "No"
	label values a1 a1

	label variable a2 "A2. Has your field supervisor assigned you to interview new households (that is,"
	note a2: "A2. Has your field supervisor assigned you to interview new households (that is, households that were not previously interviewed) in this health area?"
	label define a2 1 "Yes" 2 "No"
	label values a2 a2

	label variable hhid "A3. Household ID number"
	note hhid: "A3. Household ID number"

	label variable a4 "A4. Have you been able to locate the panel household?"
	note a4: "A4. Have you been able to locate the panel household?"
	label define a4 1 "Yes" 2 "No"
	label values a4 a4

	label variable a4_gpslatitude "A4_gps. We are going to capture your location. (latitude)"
	note a4_gpslatitude: "A4_gps. We are going to capture your location. (latitude)"

	label variable a4_gpslongitude "A4_gps. We are going to capture your location. (longitude)"
	note a4_gpslongitude: "A4_gps. We are going to capture your location. (longitude)"

	label variable a4_gpsaltitude "A4_gps. We are going to capture your location. (altitude)"
	note a4_gpsaltitude: "A4_gps. We are going to capture your location. (altitude)"

	label variable a4_gpsaccuracy "A4_gps. We are going to capture your location. (accuracy)"
	note a4_gpsaccuracy: "A4_gps. We are going to capture your location. (accuracy)"

	label variable a4_yes_wrong "A4_yes_wrong. According to the GPS, you are not close to the last known location"
	note a4_yes_wrong: "A4_yes_wrong. According to the GPS, you are not close to the last known location of this panel household. Are you sure you have identified the correct panel household?"
	label define a4_yes_wrong 1 "Yes" 2 "No"
	label values a4_yes_wrong a4_yes_wrong

	label variable a4_no_wrong1 "A4_no_wrong1. According to the GPS, you are not in the last known location of th"
	note a4_no_wrong1: "A4_no_wrong1. According to the GPS, you are not in the last known location of this panel household. Remember that you need to attempt to locate this panel household at its last known location at least once. Are you currently trying to locate this panel household at its last known location?"
	label define a4_no_wrong1 1 "Yes" 2 "No, I already tried to locate this household at its last known location" 3 "No, I am trying to locate this household at a different location"
	label values a4_no_wrong1 a4_no_wrong1

	label variable a4_no_wrong2 "A4_no_wrong2. Are you sure you are at the last known location of the panel house"
	note a4_no_wrong2: "A4_no_wrong2. Are you sure you are at the last known location of the panel household?"
	label define a4_no_wrong2 1 "Yes" 2 "No"
	label values a4_no_wrong2 a4_no_wrong2

	label variable a4_note "A4_note. Please record the details of your attempt to find the household and exp"
	note a4_note: "A4_note. Please record the details of your attempt to find the household and explain why this panel household could not be located. Remember that you need to attempt to locate this panel household at its last known location at least once."

	label variable a5_text "a5_text. Please write comments to explain why you are conducting the interview w"
	note a5_text: "a5_text. Please write comments to explain why you are conducting the interview with this household in a different location than the last known location of the household."

	label variable a5 "A5. What attempt is this to interview this household?"
	note a5: "A5. What attempt is this to interview this household?"
	label define a5 1 "First attempt" 2 "Second attempt" 3 "Third attempt" 4 "Fourth attempt"
	label values a5 a5

	label variable a6 "A6. \${b_respondent_surname_firstname} was interviewed at baseline and/or midlin"
	note a6: "A6. \${b_respondent_surname_firstname} was interviewed at baseline and/or midline. Is \${b_respondent_surname_firstname} currently available to be interviewed?"
	label define a6 1 "Yes" 2 "No"
	label values a6 a6

	label variable a6_no "A6_no. For what reason was \${b_respondent_surname_firstname} not interviewed?"
	note a6_no: "A6_no. For what reason was \${b_respondent_surname_firstname} not interviewed?"
	label define a6_no 1 "Refused, reason:" 2 "Permanently moved/migrated away to another village" 3 "Moved to another house in the same village" 4 "Temporarily away/respondent is not currently present in dwelling" 5 "Sick/hospitalized" 6 "Respondent died since last interview" 7 "Respondent asked enumerator to take off mask" -97 "Other, specify"
	label values a6_no a6_no

	label variable a6_no_refuse "Reason for refusal"
	note a6_no_refuse: "Reason for refusal"

	label variable a6_no_other "Other, specify"
	note a6_no_other: "Other, specify"

	label variable a7 "A7. [ENUMERATOR DO NOT READ: Find an available member of the household, or if no"
	note a7: "A7. [ENUMERATOR DO NOT READ: Find an available member of the household, or if no household member is available, ask a neighbor or the village chief] What is your relationship to \${b_respondent_surname_firstname}?"
	label define a7 1 "No one is available or willing to answer questions about the respondent" 2 "Spouse" 3 "Son or daughter" 4 "Son-in-law or daughter-in-law" 5 "Neighbor" 6 "Village chief" -97 "Other, specify"
	label values a7 a7

	label variable a7_other "Other, specify"
	note a7_other: "Other, specify"

	label variable a8_day "A8. Day"
	note a8_day: "A8. Day"

	label variable a8_month "A8. Month"
	note a8_month: "A8. Month"
	label define a8_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values a8_month a8_month

	label variable a8_year "A8. Year"
	note a8_year: "A8. Year"

	label variable a9 "A9. Where did \${b_respondent_surname_firstname} move to?"
	note a9: "A9. Where did \${b_respondent_surname_firstname} move to?"
	label define a9 1 "Village/Town" 2 "Province" 3 "Other country" -98 "Don’t know [DO NOT READ]"
	label values a9 a9

	label variable a9_1 "Village/Town"
	note a9_1: "Village/Town"

	label variable a9_2 "Province"
	note a9_2: "Province"

	label variable a9_3 "Other country"
	note a9_3: "Other country"

	label variable a10 "A10. Do you expect \${b_respondent_surname_firstname} will return to this villag"
	note a10: "A10. Do you expect \${b_respondent_surname_firstname} will return to this village?"
	label define a10 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values a10 a10

	label variable a10_2 "A10_2. Do you know the location/address of where the person lives now?"
	note a10_2: "A10_2. Do you know the location/address of where the person lives now?"
	label define a10_2 1 "Yes" 2 "No"
	label values a10_2 a10_2

	label variable a10_2_sp "Specify"
	note a10_2_sp: "Specify"

	label variable a11 "A11. Why is the person temporarily away?"
	note a11: "A11. Why is the person temporarily away?"

	label variable a12_day "A12. Day"
	note a12_day: "A12. Day"

	label variable a12_month "A12. Month"
	note a12_month: "A12. Month"
	label define a12_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values a12_month a12_month

	label variable a12_year "A12. Year"
	note a12_year: "A12. Year"

	label variable a13 "A13. Has the respondent sought medical care for their illness?"
	note a13: "A13. Has the respondent sought medical care for their illness?"
	label define a13 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values a13 a13

	label variable a14 "A14. Where has the respondent sought medical care?"
	note a14: "A14. Where has the respondent sought medical care?"

	label variable a14_other "Other, specify"
	note a14_other: "Other, specify"

	label variable a15_day "A15. Day"
	note a15_day: "A15. Day"

	label variable a15_month "A15. Month"
	note a15_month: "A15. Month"
	label define a15_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values a15_month a15_month

	label variable a15_year "A15. Year"
	note a15_year: "A15. Year"

	label variable a16 "A16. I’d like to ask you some specific questions about the events and symptoms \"
	note a16: "A16. I’d like to ask you some specific questions about the events and symptoms \${b_respondent_surname_firstname} had during the time before death. I know it may be difficult to talk about your \${a7_label} but this information is very important in helping us to understand health status and mortality outcomes. Can I ask you some questions about this?"
	label define a16 1 "Yes" 2 "No"
	label values a16 a16

	label variable a17_day "A17. Day"
	note a17_day: "A17. Day"

	label variable a17_month "A17. Month"
	note a17_month: "A17. Month"
	label define a17_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values a17_month a17_month

	label variable a17_year "A17. Year"
	note a17_year: "A17. Year"

	label variable a18 "A18. For how long was \${b_respondent_surname_firstname} sick before she died?"
	note a18: "A18. For how long was \${b_respondent_surname_firstname} sick before she died?"
	label define a18 1 "Less than 1 month" 2 "1 to 2 months" 3 "2 to 6 months" 4 "More than 6 months" -98 "Don’t know [DO NOT READ]"
	label values a18 a18

	label variable a19 "A19. Was \${b_respondent_surname_firstname} pregnant when she died?"
	note a19: "A19. Was \${b_respondent_surname_firstname} pregnant when she died?"
	label define a19 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values a19 a19

	label variable a20 "A20. Did \${b_respondent_surname_firstname} die within six weeks of giving birth"
	note a20: "A20. Did \${b_respondent_surname_firstname} die within six weeks of giving birth?"
	label define a20 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values a20 a20

	label variable a21 "A21. Tell me about the illness that led to \${b_respondent_surname_firstname}’s "
	note a21: "A21. Tell me about the illness that led to \${b_respondent_surname_firstname}’s death. [PROMPT:] Is there anything else?"

	label variable a22 "A22. During the illness/sickness that led to \${b_respondent_surname_firstname}’"
	note a22: "A22. During the illness/sickness that led to \${b_respondent_surname_firstname}’s death, did she seek advice or treatment from anywhere/anyone?"
	label define a22 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values a22 a22

	label variable a23 "A23. Where did \${b_respondent_surname_firstname} seek advice or treatment?"
	note a23: "A23. Where did \${b_respondent_surname_firstname} seek advice or treatment?"

	label variable a23_other "Other, specify"
	note a23_other: "Other, specify"

	label variable a24 "A24. You should try to interview the person who was interviewed at baseline or m"
	note a24: "A24. You should try to interview the person who was interviewed at baseline or midline. If they are temporarily away from their house, you should try to interview them at another time. If they are completely unavailable to be interviewed, you may interview their spouse/partner who is also the primary caregiver of the same children. If this is not possible, then you may interview another female adult who lives in the same house. Is there another eligible household member who is available to be interviewed?"
	label define a24 1 "Yes" 2 "No" 3 "Not applicable right now because will try to interview baseline or midline respo"
	label values a24 a24

	label variable a24_text "a24_text. Please record the details of your attempt to interview the respondent "
	note a24_text: "a24_text. Please record the details of your attempt to interview the respondent and explain why another member of the household could not be interviewed."

	label variable a24a "A24a. What is this person’s relationship with the person who was interviewed at "
	note a24a: "A24a. What is this person’s relationship with the person who was interviewed at baseline or midline?"
	label define a24a 1 "Their spouse/partner" 2 "A female adult who lives in the same house"
	label values a24a a24a

	label variable a24b "A24b. If you are unable to interview the person who was interviewed at baseline,"
	note a24b: "A24b. If you are unable to interview the person who was interviewed at baseline, then you should try to interview their spouse/partner. Why are you not interviewing the spouse/partner of the person who was interviewed at baseline or midline?"
	label define a24b 1 "Spouse/partner refused, reason:" 2 "Spouse/partner permanently moved/migrated away to another village" 3 "Spouse/partner moved to another house in the same village" 4 "Spouse/partner temporarily away/ not currently present in dwelling" 5 "Spouse/partner is sick/hospitalized" 6 "Baseline/midline respondent does not have a spouse/partner" 7 "Spouse/partner asked enumerator to take off mask" -97 "Other, specify"
	label values a24b a24b

	label variable a24b_other "Other, specify"
	note a24b_other: "Other, specify"

	label variable a24b_refused_reason "Refusal reason:"
	note a24b_refused_reason: "Refusal reason:"

	label variable a25 "A25. Respondent Name: Is your name \${b_respondent_surname_firstname}?"
	note a25: "A25. Respondent Name: Is your name \${b_respondent_surname_firstname}?"
	label define a25 1 "Yes" 2 "Correction needs to be made"
	label values a25 a25

	label variable a25_fix "A25_fix. [ENUMERATOR DO NOT READ: Record the correct name.]"
	note a25_fix: "A25_fix. [ENUMERATOR DO NOT READ: Record the correct name.]"

	label variable a27 "A27. Respondent Gender: \${b_resp_gender} [ENUMERATOR DO NOT READ: Observe and r"
	note a27: "A27. Respondent Gender: \${b_resp_gender} [ENUMERATOR DO NOT READ: Observe and record if the gender displayed in the tablet is correct]."
	label define a27 1 "Correct" 2 "Incorrect"
	label values a27 a27

	label variable a27_fix "A27_fix. [ENUMERATOR DO NOT READ: Observe and record the correct gender]."
	note a27_fix: "A27_fix. [ENUMERATOR DO NOT READ: Observe and record the correct gender]."
	label define a27_fix 1 "Male" 2 "Female"
	label values a27_fix a27_fix

	label variable a28 "A28. Respondent Age: Are you \${b_resp_age} years old?"
	note a28: "A28. Respondent Age: Are you \${b_resp_age} years old?"
	label define a28 1 "Yes" 2 "No"
	label values a28 a28

	label variable a28_fix "A28_fix. What is your age? [ENUMERATOR Do not read: record answer in years]"
	note a28_fix: "A28_fix. What is your age? [ENUMERATOR Do not read: record answer in years]"

	label variable intro_gpslatitude "Please collect the GPS coordinates (latitude)"
	note intro_gpslatitude: "Please collect the GPS coordinates (latitude)"

	label variable intro_gpslongitude "Please collect the GPS coordinates (longitude)"
	note intro_gpslongitude: "Please collect the GPS coordinates (longitude)"

	label variable intro_gpsaltitude "Please collect the GPS coordinates (altitude)"
	note intro_gpsaltitude: "Please collect the GPS coordinates (altitude)"

	label variable intro_gpsaccuracy "Please collect the GPS coordinates (accuracy)"
	note intro_gpsaccuracy: "Please collect the GPS coordinates (accuracy)"

	label variable q16 "16. Do you agree to be interviewed for our study?"
	note q16: "16. Do you agree to be interviewed for our study?"
	label define q16 1 "Yes" 2 "No"
	label values q16 q16

	label variable sys_starttime "Please select the current date and time"
	note sys_starttime: "Please select the current date and time"

	label variable language "Spoken Language of interview"
	note language: "Spoken Language of interview"

	label variable _120_1_1_show_table "Conjoint 1.1.1"
	note _120_1_1_show_table: "Conjoint 1.1.1"
	label define _120_1_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_1_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_1_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_1_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_1_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_1_1_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_1_1_show_table _120_1_1_show_table

	label variable _120_1_2_show_table "Conjoint 1.1.2"
	note _120_1_2_show_table: "Conjoint 1.1.2"
	label define _120_1_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_1_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_1_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_1_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_1_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_1_2_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_1_2_show_table _120_1_2_show_table

	label variable _120_1_conjoint_11a "Conjoint 1.1.a. If you had to choose one of the two health centers, which one wo"
	note _120_1_conjoint_11a: "Conjoint 1.1.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _120_1_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _120_1_conjoint_11a _120_1_conjoint_11a

	label variable _120_1_conjoint_11b "Conjoint 1.1.b. What grade between 1 and 100 would give Center A (100 being the "
	note _120_1_conjoint_11b: "Conjoint 1.1.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _120_1_conjoint_11c "Conjoint 1.1.c. What grade between 1 and 100 would give Center B (100 being the "
	note _120_1_conjoint_11c: "Conjoint 1.1.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable _120_2_1_show_table "Conjoint 1.2.1"
	note _120_2_1_show_table: "Conjoint 1.2.1"
	label define _120_2_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_2_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_2_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_2_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_2_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_2_1_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_2_1_show_table _120_2_1_show_table

	label variable _120_2_2_show_table "Conjoint 1.2.2"
	note _120_2_2_show_table: "Conjoint 1.2.2"
	label define _120_2_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_2_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_2_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_2_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_2_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_2_2_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_2_2_show_table _120_2_2_show_table

	label variable _120_2_conjoint_11a "Conjoint 1.2.a. If you had to choose one of the two health centers, which one wo"
	note _120_2_conjoint_11a: "Conjoint 1.2.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _120_2_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _120_2_conjoint_11a _120_2_conjoint_11a

	label variable _120_2_conjoint_11b "Conjoint 1.2.b. What grade between 1 and 100 would give Center A (100 being the "
	note _120_2_conjoint_11b: "Conjoint 1.2.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _120_2_conjoint_11c "Conjoint 1.2.c. What grade between 1 and 100 would give Center B (100 being the "
	note _120_2_conjoint_11c: "Conjoint 1.2.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable _120_3_1_show_table "Conjoint 1.3.1"
	note _120_3_1_show_table: "Conjoint 1.3.1"
	label define _120_3_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_3_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_3_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_3_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_3_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_3_1_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_3_1_show_table _120_3_1_show_table

	label variable _120_3_2_show_table "Conjoint 1.3.2"
	note _120_3_2_show_table: "Conjoint 1.3.2"
	label define _120_3_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_120_3_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_120_3_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_120_3_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_120_3_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_120_3_2_fifth_perm_att}" 16 "0" 17 "0"
	label values _120_3_2_show_table _120_3_2_show_table

	label variable _120_3_conjoint_11a "Conjoint 1.3.a. If you had to choose one of the two health centers, which one wo"
	note _120_3_conjoint_11a: "Conjoint 1.3.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _120_3_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _120_3_conjoint_11a _120_3_conjoint_11a

	label variable _120_3_conjoint_11b "Conjoint 1.3.b. What grade between 1 and 100 would give Center A (100 being the "
	note _120_3_conjoint_11b: "Conjoint 1.3.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _120_3_conjoint_11c "Conjoint 1.3.c. What grade between 1 and 100 would give Center B (100 being the "
	note _120_3_conjoint_11c: "Conjoint 1.3.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable _720_1_1_show_table "Conjoint 2.1.1"
	note _720_1_1_show_table: "Conjoint 2.1.1"
	label define _720_1_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_1_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_1_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_1_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_1_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_1_1_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_1_1_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_1_1_show_table _720_1_1_show_table

	label variable _720_1_2_show_table "Conjoint 2.1.2"
	note _720_1_2_show_table: "Conjoint 2.1.2"
	label define _720_1_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_1_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_1_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_1_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_1_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_1_2_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_1_2_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_1_2_show_table _720_1_2_show_table

	label variable _720_1_conjoint_11a "Conjoint 2.1.a. If you had to choose one of the two health centers, which one wo"
	note _720_1_conjoint_11a: "Conjoint 2.1.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _720_1_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _720_1_conjoint_11a _720_1_conjoint_11a

	label variable _720_1_conjoint_11b "Conjoint 2.1.b. What grade between 1 and 100 would give Center A (100 being the "
	note _720_1_conjoint_11b: "Conjoint 2.1.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _720_1_conjoint_11c "Conjoint 2.1.c. What grade between 1 and 100 would give Center B (100 being the "
	note _720_1_conjoint_11c: "Conjoint 2.1.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable _720_2_1_show_table "Conjoint 2.2.1"
	note _720_2_1_show_table: "Conjoint 2.2.1"
	label define _720_2_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_2_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_2_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_2_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_2_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_2_1_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_2_1_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_2_1_show_table _720_2_1_show_table

	label variable _720_2_2_show_table "Conjoint 2.2.2"
	note _720_2_2_show_table: "Conjoint 2.2.2"
	label define _720_2_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_2_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_2_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_2_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_2_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_2_2_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_2_2_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_2_2_show_table _720_2_2_show_table

	label variable _720_2_conjoint_11a "Conjoint 2.2.a. If you had to choose one of the two health centers, which one wo"
	note _720_2_conjoint_11a: "Conjoint 2.2.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _720_2_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _720_2_conjoint_11a _720_2_conjoint_11a

	label variable _720_2_conjoint_11b "Conjoint 2.2.b. What grade between 1 and 100 would give Center A (100 being the "
	note _720_2_conjoint_11b: "Conjoint 2.2.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _720_2_conjoint_11c "Conjoint 2.2.c. What grade between 1 and 100 would give Center B (100 being the "
	note _720_2_conjoint_11c: "Conjoint 2.2.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable _720_3_1_show_table "Conjoint 2.3.1"
	note _720_3_1_show_table: "Conjoint 2.3.1"
	label define _720_3_1_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_3_1_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_3_1_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_3_1_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_3_1_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_3_1_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_3_1_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_3_1_show_table _720_3_1_show_table

	label variable _720_3_2_show_table "Conjoint 2.3.2"
	note _720_3_2_show_table: "Conjoint 2.3.2"
	label define _720_3_2_show_table 0 "Characteristics" 1 "Centre A" 2 "Centre B" 3 "\${_720_3_2_first_perm_att}" 4 "0" 5 "0" 6 "\${_720_3_2_second_perm_att}" 7 "0" 8 "0" 9 "\${_720_3_2_third_perm_att}" 10 "0" 11 "0" 12 "\${_720_3_2_fourth_perm_att}" 13 "0" 14 "0" 15 "\${_720_3_2_fifth_perm_att}" 16 "0" 17 "0" 18 "\${_720_3_2_sixth_perm_att}" 19 "0" 20 "0"
	label values _720_3_2_show_table _720_3_2_show_table

	label variable _720_3_conjoint_11a "Conjoint 2.3.a. If you had to choose one of the two health centers, which one wo"
	note _720_3_conjoint_11a: "Conjoint 2.3.a. If you had to choose one of the two health centers, which one would you go to? Center A or Center B?"
	label define _720_3_conjoint_11a 1 "Centre A" 2 "Centre B" -99 "Refused to answer (DO NOT READ)"
	label values _720_3_conjoint_11a _720_3_conjoint_11a

	label variable _720_3_conjoint_11b "Conjoint 2.3.b. What grade between 1 and 100 would give Center A (100 being the "
	note _720_3_conjoint_11b: "Conjoint 2.3.b. What grade between 1 and 100 would give Center A (100 being the highest)?"

	label variable _720_3_conjoint_11c "Conjoint 2.3.c. What grade between 1 and 100 would give Center B (100 being the "
	note _720_3_conjoint_11c: "Conjoint 2.3.c. What grade between 1 and 100 would give Center B (100 being the highest)?"

	label variable q101b "Given Name:"
	note q101b: "Given Name:"

	label variable q101a "Surname/Family Name:"
	note q101a: "Surname/Family Name:"

	label variable q103 "103. Gender"
	note q103: "103. Gender"
	label define q103 1 "Male" 2 "Female"
	label values q103 q103

	label variable q104 "104. What is your age? [ENUMERATOR Do not read: record answer in years]: (####)"
	note q104: "104. What is your age? [ENUMERATOR Do not read: record answer in years]: (####)"

	label variable q105 "105. Are you the head of your household?"
	note q105: "105. Are you the head of your household?"
	label define q105 1 "Yes" 2 "No"
	label values q105 q105

	label variable q106 "106. What is your relationship to the head of the household?"
	note q106: "106. What is your relationship to the head of the household?"
	label define q106 1 "Wife/Husband/Spouse" 2 "Son or Daughter" 3 "Son-in-law or Daughter-in-law" 4 "Grandchild" 5 "Parent" 6 "Parent-in-law" 7 "Brother or Sister" 8 "Niece or Nephew" 9 "Aunt or Uncle" 10 "Co-Wife" 11 "Adopted/Foster/Stepchild" -97 "Other Relative, specify" 13 "Not Related" -98 "Don't know (DO NOT READ)"
	label values q106 q106

	label variable q106_other "Other relative, please specify"
	note q106_other: "Other relative, please specify"

	label variable q107b "b. Given name:"
	note q107b: "b. Given name:"

	label variable q107a "a. Surname/Family name:"
	note q107a: "a. Surname/Family name:"

	label variable q108 "108. Is the head of household a woman or a man?"
	note q108: "108. Is the head of household a woman or a man?"
	label define q108 1 "Woman" 2 "Man"
	label values q108 q108

	label variable q109 "109. How old is the household head?: [ENUMERATOR Do not read: record answer in y"
	note q109: "109. How old is the household head?: [ENUMERATOR Do not read: record answer in years]: (####)"

	label variable num_hh_members "How many people live in this household?"
	note num_hh_members: "How many people live in this household?"

	label variable under5childrenresp "114. What is the number of children under 5 that are living in this household?"
	note under5childrenresp: "114. What is the number of children under 5 that are living in this household?"

	label variable q115b "115b. Can you please select all children under the age of five in this household"
	note q115b: "115b. Can you please select all children under the age of five in this household?"

	label variable q301 "301. Is any woman in the household between the ages of 15 and 45 pregnant at the"
	note q301: "301. Is any woman in the household between the ages of 15 and 45 pregnant at the moment?"
	label define q301 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q301 q301

	label variable q302 "302. How many women between the ages of 15 and 45 are pregnant at the moment?"
	note q302: "302. How many women between the ages of 15 and 45 are pregnant at the moment?"

	label variable preg_counter_pre1 "Is \${preg_name1} available to answer a few questions today?"
	note preg_counter_pre1: "Is \${preg_name1} available to answer a few questions today?"
	label define preg_counter_pre1 1 "Yes" 2 "No"
	label values preg_counter_pre1 preg_counter_pre1

	label variable preg_counter_pre2 "How many of these women who are pregnant are available to answer a few questions"
	note preg_counter_pre2: "How many of these women who are pregnant are available to answer a few questions today?"
	label define preg_counter_pre2 0 "None" 1 "One pregnant woman is available" 2 "More than one pregnant woman is available"
	label values preg_counter_pre2 preg_counter_pre2

	label variable preg_select_name1_num "Which pregnant woman is available to interview today?"
	note preg_select_name1_num: "Which pregnant woman is available to interview today?"
	label define preg_select_name1_num 1 "#1: \${preg_name1}" 2 "#2: \${preg_name2}" 3 "#3: \${preg_name3}" 4 "#4: \${preg_name4}" 5 "#5: \${preg_name5}" 6 "#6: \${preg_name6}" 7 "#7: \${preg_name7}" 8 "#8: \${preg_name8}"
	label values preg_select_name1_num preg_select_name1_num

	label variable preg_select_name2_num "Of the pregnant women who are available, whose birthday is coming up next?"
	note preg_select_name2_num: "Of the pregnant women who are available, whose birthday is coming up next?"
	label define preg_select_name2_num 1 "#1: \${preg_name1}" 2 "#2: \${preg_name2}" 3 "#3: \${preg_name3}" 4 "#4: \${preg_name4}" 5 "#5: \${preg_name5}" 6 "#6: \${preg_name6}" 7 "#7: \${preg_name7}" 8 "#8: \${preg_name8}"
	label values preg_select_name2_num preg_select_name2_num

	label variable q304 "How long have you been pregnant for?"
	note q304: "How long have you been pregnant for?"
	label define q304 1 "Weeks:" 2 "Months:"
	label values q304 q304

	label variable q304_week "Please enter weeks:"
	note q304_week: "Please enter weeks:"

	label variable q304_month "Please enter months:"
	note q304_month: "Please enter months:"

	label variable q306 "306. Have you seen any medical professional/health worker for an antenatal care "
	note q306: "306. Have you seen any medical professional/health worker for an antenatal care during this pregnancy?"
	label define q306 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q306 q306

	label variable q307 "307. Why did you not see anyone for antenatal care (ENUMERATOR Do not read: Prob"
	note q307: "307. Why did you not see anyone for antenatal care (ENUMERATOR Do not read: Probe for Anything else? Select all that apply)"

	label variable q307a "307a. Other; specify:"
	note q307a: "307a. Other; specify:"

	label variable q308 "308. Who have you seen for a antenatal care? (ENUMERATOR Do not read: Probe for "
	note q308: "308. Who have you seen for a antenatal care? (ENUMERATOR Do not read: Probe for Anything else? Select all that apply)."

	label variable q308a "308a. Other; specify:"
	note q308a: "308a. Other; specify:"

	label variable q309 "309. Where have you received care during your pregnancy? (ENUMERATOR Do not read"
	note q309: "309. Where have you received care during your pregnancy? (ENUMERATOR Do not read: Probe for Anything else? Select all that apply)."

	label variable q309a "309a. Other; specify:"
	note q309a: "309a. Other; specify:"

	label variable q310 "310. How long were you pregnant for when you first received antenatal care?"
	note q310: "310. How long were you pregnant for when you first received antenatal care?"
	label define q310 1 "Weeks:" 2 "Months:"
	label values q310 q310

	label variable q310_week "Please enter weeks:"
	note q310_week: "Please enter weeks:"

	label variable q310_month "Please enter months:"
	note q310_month: "Please enter months:"

	label variable q311 "311. How many times in total have you received health care for your pregnancy?"
	note q311: "311. How many times in total have you received health care for your pregnancy?"

	label variable q312 "312. Has your blood pressure been measured?"
	note q312: "312. Has your blood pressure been measured?"
	label define q312 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q312 q312

	label variable q318 "313. Have you been given SP/Fansidar to keep you from getting malaria?"
	note q318: "313. Have you been given SP/Fansidar to keep you from getting malaria?"
	label define q318 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q318 q318

	label variable q319 "319. Has any woman in the household between the ages of 15 and 45 given birth in"
	note q319: "319. Has any woman in the household between the ages of 15 and 45 given birth in the past 24 months? We are interested in any birth, even if the baby was born dead or was born alive but died shortly thereafter."
	label define q319 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q319 q319

	label variable q320 "320. How many women between the ages of 15 and 45 have given birth in the past 2"
	note q320: "320. How many women between the ages of 15 and 45 have given birth in the past 24 months? Again, we are interested in any birth, even if the baby was born dead or was born alive but died shortly thereafter."

	label variable q320a "320a. How many births took place within the household in the past 24 months? Ple"
	note q320a: "320a. How many births took place within the household in the past 24 months? Please include all births, including those were the baby was born dead or was born alive but died shortly thereafter."

	label variable q320b "320b. Of these births, how many were still born?"
	note q320b: "320b. Of these births, how many were still born?"

	label variable birth_counter_pre1 "Is \${birth_name1} available to answer a few questions today?"
	note birth_counter_pre1: "Is \${birth_name1} available to answer a few questions today?"
	label define birth_counter_pre1 1 "Yes" 2 "No"
	label values birth_counter_pre1 birth_counter_pre1

	label variable birth_counter_pre2 "How many of these women who recently gave birth are available to answer a few qu"
	note birth_counter_pre2: "How many of these women who recently gave birth are available to answer a few questions today?"
	label define birth_counter_pre2 0 "None" 1 "One woman who recently gave birth is available" 2 "More than one woman who recently gave birth is available"
	label values birth_counter_pre2 birth_counter_pre2

	label variable birth_select_name1_num "Which woman who recently gave birth is available to interview today?"
	note birth_select_name1_num: "Which woman who recently gave birth is available to interview today?"
	label define birth_select_name1_num 1 "#1: \${birth_name1}" 2 "#2: \${birth_name2}" 3 "#3: \${birth_name3}" 4 "#4: \${birth_name4}" 5 "#5: \${birth_name5}" 6 "#6: \${birth_name6}" 7 "#7: \${birth_name7}" 8 "#8: \${birth_name8}"
	label values birth_select_name1_num birth_select_name1_num

	label variable birth_select_name2_num "Of the women who gave birth who are available, whose birthday is coming up next?"
	note birth_select_name2_num: "Of the women who gave birth who are available, whose birthday is coming up next?"
	label define birth_select_name2_num 1 "#1: \${birth_name1}" 2 "#2: \${birth_name2}" 3 "#3: \${birth_name3}" 4 "#4: \${birth_name4}" 5 "#5: \${birth_name5}" 6 "#6: \${birth_name6}" 7 "#7: \${birth_name7}" 8 "#8: \${birth_name8}"
	label values birth_select_name2_num birth_select_name2_num

	label variable q324 "324. Have you seen any medical professional/health worker for antenatal care dur"
	note q324: "324. Have you seen any medical professional/health worker for antenatal care during this pregnancy?"
	label define q324 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q324 q324

	label variable q325 "325. Why did you not see anyone for antenatal care (ENUMERATOR Do not read: Prob"
	note q325: "325. Why did you not see anyone for antenatal care (ENUMERATOR Do not read: Probe for Anything else? Select all that apply). [PROGRAMMER: Anyone responding to this question should then be directed to 330]"

	label variable q325a "325a. Other; specify:"
	note q325a: "325a. Other; specify:"

	label variable q326 "326. Who did you see for antenatal care? (ENUMERATOR Do not read: Probe for anyt"
	note q326: "326. Who did you see for antenatal care? (ENUMERATOR Do not read: Probe for anything else. Select all that apply. Select 'Other' only if strictly necessary). [CAN READ OPTIONS IF NEEDED]"

	label variable q326a "326a. Other; specify:"
	note q326a: "326a. Other; specify:"

	label variable q327 "327. Where have you received antenatal care during your pregnancy? (ENUMERATOR D"
	note q327: "327. Where have you received antenatal care during your pregnancy? (ENUMERATOR Do not read: Probe for anything else. Select all that apply. Select 'Other' only if strictly necessary). [CAN READ OPTIONS IF NEEDED]"

	label variable q327a "327a. Other; specify:"
	note q327a: "327a. Other; specify:"

	label variable q328 "328. How long were you pregnant for when you first received antenatal care for y"
	note q328: "328. How long were you pregnant for when you first received antenatal care for your pregnancy?"
	label define q328 1 "Weeks:" 2 "Months:"
	label values q328 q328

	label variable q328_week "Please enter weeks:"
	note q328_week: "Please enter weeks:"

	label variable q328_month "Please enter months:"
	note q328_month: "Please enter months:"

	label variable q329 "329. How many times in total have you received antenatal care for your pregnancy"
	note q329: "329. How many times in total have you received antenatal care for your pregnancy?"

	label variable q330 "330. Was your blood pressure measured?"
	note q330: "330. Was your blood pressure measured?"
	label define q330 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q330 q330

	label variable q336 "336. Were you given SP / Fansidar / Azac to keep you from getting malaria?"
	note q336: "336. Were you given SP / Fansidar / Azac to keep you from getting malaria?"
	label define q336 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q336 q336

	label variable q337 "337. Where did you give birth to the baby?"
	note q337: "337. Where did you give birth to the baby?"
	label define q337 1 "Home" 2 "Other home" 3 "Hospital" 4 "Health Center in your health areas" 5 "Other health center" 6 "Health post" -97 "Other, specify:" -98 "Don’t know (Do not read)"
	label values q337 q337

	label variable q337a "337a. Other; specify:"
	note q337a: "337a. Other; specify:"

	label variable q338 "338. Was the baby delivered by caesarean, that is, did they cut you belly open t"
	note q338: "338. Was the baby delivered by caesarean, that is, did they cut you belly open to take the baby out?"
	label define q338 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q338 q338

	label variable q340 "340. I would like to talk to you about checks on your health after delivery, for"
	note q340: "340. I would like to talk to you about checks on your health after delivery, for example, someone asking you questions about your health or examining you. After delivery, did anyone check on your health within one week after delivery?"
	label define q340 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q340 q340

	label variable q341 "341. Who checked on your health at that time?"
	note q341: "341. Who checked on your health at that time?"
	label define q341 1 "Doctor" 2 "Nurse" 3 "Midwife/birth attendant connected to healthcare system (not traditional one) PRO" 4 "Community health worker" -97 "Other, specify:" -98 "Don’t know (Do not read)"
	label values q341 q341

	label variable q341a "342a. Other; specify:"
	note q341a: "342a. Other; specify:"

	label variable q342 "342. Where did the check take place?"
	note q342: "342. Where did the check take place?"
	label define q342 1 "Home" 2 "Other home" 3 "Hospital" 4 "Health Center in your health areas" 5 "Other health center" 6 "Health post" -97 "Other, specify:" -98 "Don’t know (Do not read)"
	label values q342 q342

	label variable q342a "342a. Other; specify:"
	note q342a: "342a. Other; specify:"

	label variable q343 "343. Was the baby born alive?"
	note q343: "343. Was the baby born alive?"
	label define q343 1 "Yes" 2 "No (READ: I’m sorry to hear about your loss)"
	label values q343 q343

	label variable q346 "346. Measure the baby’s length?"
	note q346: "346. Measure the baby’s length?"
	label define q346 1 "Yes" 2 "No" -98 "Don’t know (Do not read)" -99 "Not applicable"
	label values q346 q346

	label variable q347 "347. Measure the baby’s head circumference?"
	note q347: "347. Measure the baby’s head circumference?"
	label define q347 1 "Yes" 2 "No" -98 "Don’t know (Do not read)" -99 "Not applicable"
	label values q347 q347

	label variable q352 "352. Are you currently breastfeeding your baby?"
	note q352: "352. Are you currently breastfeeding your baby?"
	label define q352 1 "Yes; exclusively" 2 "Yes; not exclusively" 3 "No" 4 "No; baby is dead [READ: I’m sorry to hear about your loss.]" -98 "Don’t know (Do not read)"
	label values q352 q352

	label variable q355 "355. Did you ever breastfeed your baby? [CAN READ OPTIONS IF NEEDED]"
	note q355: "355. Did you ever breastfeed your baby? [CAN READ OPTIONS IF NEEDED]"
	label define q355 1 "Yes; exclusively" 2 "Yes; not exclusively" 3 "No" -98 "Don’t know (Do not read)"
	label values q355 q355

	label variable q356_weeks "Please enter weeks:"
	note q356_weeks: "Please enter weeks:"

	label variable q356_months "Please enter months:"
	note q356_months: "Please enter months:"

	label variable q400 "400. May I ask if in this household any child younger than 28 days old has died "
	note q400: "400. May I ask if in this household any child younger than 28 days old has died in the past 12 months?"
	label define q400 1 "Yes [READ: I am very sorry to hear about your loss]" 2 "No" -98 "Don’t know (Do not read)"
	label values q400 q400

	label variable q401 "401. May I ask how many?"
	note q401: "401. May I ask how many?"

	label variable q405 "405. May I ask if in this household, any child under 5 years old (and older than"
	note q405: "405. May I ask if in this household, any child under 5 years old (and older than 28 days) has died in the past 12 months?"
	label define q405 1 "Yes [READ: I am very sorry to hear about your loss]" 2 "No" -98 "Don’t know (Do not read)"
	label values q405 q405

	label variable q406 "406. May I ask how many?"
	note q406: "406. May I ask how many?"

	label variable q413 "413. May I ask if any women between 15 and 45 years have passed away in your hou"
	note q413: "413. May I ask if any women between 15 and 45 years have passed away in your household in the past 24 months?"
	label define q413 1 "Yes [READ: I am very sorry to hear about your loss]" 2 "No" -98 "Don’t know (Do not read)"
	label values q413 q413

	label variable q414 "414. May I ask how many women between 15 and 45 years have passed away in your h"
	note q414: "414. May I ask how many women between 15 and 45 years have passed away in your household in the past 24 months?"

	label variable q501 "501. In the last 2 weeks, has any member of the household that is 5 years or old"
	note q501: "501. In the last 2 weeks, has any member of the household that is 5 years or older been ill, that is felt too sick to do [YOUR/HIS/HER] normal activities?"
	label define q501 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q501 q501

	label variable q502 "502. Has more than one person 5 years or older been ill in the past 2 weeks?"
	note q502: "502. Has more than one person 5 years or older been ill in the past 2 weeks?"
	label define q502 1 "More than one person has been sick" 2 "Only one person has been sick"
	label values q502 q502

	label variable q502a "502a. Who was that person?"
	note q502a: "502a. Who was that person?"
	label define q502a 1 "\${name_gt4_1}" 2 "\${name_gt4_2}" 3 "\${name_gt4_3}" 4 "\${name_gt4_4}" 5 "\${name_gt4_5}" 6 "\${name_gt4_6}" 7 "\${name_gt4_7}" 8 "\${name_gt4_8}" 9 "\${name_gt4_9}" 10 "\${name_gt4_10}" 11 "\${name_gt4_11}" 12 "\${name_gt4_12}" 13 "\${name_gt4_13}" 14 "\${name_gt4_14}" 15 "\${name_gt4_15}" 16 "\${name_gt4_16}" 17 "\${name_gt4_17}" 18 "\${name_gt4_18}" 19 "\${name_gt4_19}" 20 "\${name_gt4_20}"
	label values q502a q502a

	label variable q502b "502b. Who were those persons?"
	note q502b: "502b. Who were those persons?"

	label variable q502c "502c. Of all the household members who are 5 years or older and have been ill in"
	note q502c: "502c. Of all the household members who are 5 years or older and have been ill in the past 2 weeks, whose birthday is coming up next?"
	label define q502c 1 "\${name_gt4_1}" 2 "\${name_gt4_2}" 3 "\${name_gt4_3}" 4 "\${name_gt4_4}" 5 "\${name_gt4_5}" 6 "\${name_gt4_6}" 7 "\${name_gt4_7}" 8 "\${name_gt4_8}" 9 "\${name_gt4_9}" 10 "\${name_gt4_10}" 11 "\${name_gt4_11}" 12 "\${name_gt4_12}" 13 "\${name_gt4_13}" 14 "\${name_gt4_14}" 15 "\${name_gt4_15}" 16 "\${name_gt4_16}" 17 "\${name_gt4_17}" 18 "\${name_gt4_18}" 19 "\${name_gt4_19}" 20 "\${name_gt4_20}"
	label values q502c q502c

	label variable q504 "504. Including today, how many days of work or school did \${q502c_label} miss d"
	note q504: "504. Including today, how many days of work or school did \${q502c_label} miss due to illness?"
	label define q504 1 "0 days" 2 "1 day" 3 "2 days" 4 "3 days" 5 "4 days" 6 "5 or more; enter number" -98 "Don’t know (Do not read)"
	label values q504 q504

	label variable q504_num "Number of days"
	note q504_num: "Number of days"

	label variable q507 "507. Did you seek advice or treatment for this illness?"
	note q507: "507. Did you seek advice or treatment for this illness?"
	label define q507 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q507 q507

	label variable q508 "508. Where did you seek advice or treatment?"
	note q508: "508. Where did you seek advice or treatment?"

	label variable q508_other "q508_other. Other; specify"
	note q508_other: "q508_other. Other; specify"

	label variable q509 "509. Where did you first seek advice or treatment?"
	note q509: "509. Where did you first seek advice or treatment?"
	label define q509 1 "Hospital" 2 "Health Center in your health area‎" 3 "Other Health Center" 4 "Health Post" 5 "Dispensary" 6 "Private Doctor" 7 "Mobile Clinic" 8 "Community health worker" 9 "Pharmacy" 10 "Traditional practitioner/healer" 11 "Itinerant drug seller" 12 "Market vendor" 97 "\${q508_other}" -98 "Don’t know (Do not read)"
	label values q509 q509

	label variable q510 "510. How many days after the illness began did you first seek advice or treatmen"
	note q510: "510. How many days after the illness began did you first seek advice or treatment?"

	label variable q601 "601. Have you received information from health center staff or community health "
	note q601: "601. Have you received information from health center staff or community health workers about family planning methods?"
	label define q601 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q601 q601

	label variable q511_0 "511a. Have you ever visited the health center of this village/town to seek care "
	note q511_0: "511a. Have you ever visited the health center of this village/town to seek care to yourself or someone else?"
	label define q511_0 1 "Yes" 2 "No"
	label values q511_0 q511_0

	label variable q511_day "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
	note q511_day: "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"

	label variable q511_month "Month"
	note q511_month: "Month"
	label define q511_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values q511_month q511_month

	label variable q511_year "Year"
	note q511_year: "Year"

	label variable q512 "512. Were you seeking care for yourself or someone you were with?"
	note q512: "512. Were you seeking care for yourself or someone you were with?"
	label define q512 1 "Respondent" 2 "Someone else"
	label values q512 q512

	label variable q513 "513. How easy or difficult would you say it was to obtain medical care?"
	note q513: "513. How easy or difficult would you say it was to obtain medical care?"
	label define q513 1 "Very easy" 2 "Easy" 3 "Neither easy nor difficult (Do not read)" 4 "Difficult" 5 "Very difficult" -98 "Don’t know (Do not read)"
	label values q513 q513

	label variable q514 "514. What type of health provider consulted with you about [YOUR/THE PATIENT’S] "
	note q514: "514. What type of health provider consulted with you about [YOUR/THE PATIENT’S] care?"

	label variable q514_other "Other; specify"
	note q514_other: "Other; specify"

	label variable q515_minutes "Minutes"
	note q515_minutes: "Minutes"

	label variable q515_hours "Hours"
	note q515_hours: "Hours"

	label variable q516 "516. Did the staff take any tests during your/the patient’s visit?"
	note q516: "516. Did the staff take any tests during your/the patient’s visit?"

	label variable q517 "517. Was the diagnosis clearly explained to you/the patient?"
	note q517: "517. Was the diagnosis clearly explained to you/the patient?"
	label define q517 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q517 q517

	label variable q518 "518. Were you prescribed medicine?"
	note q518: "518. Were you prescribed medicine?"
	label define q518 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q518 q518

	label variable q519 "519. Was the medicine available at the health facility that day?"
	note q519: "519. Was the medicine available at the health facility that day?"
	label define q519 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q519 q519

	label variable q520 "520. Overall, how satisfied were you with the quality of services received durin"
	note q520: "520. Overall, how satisfied were you with the quality of services received during your most recent visit to the health center in this village/town ?"
	label define q520 1 "Very satisfied" 2 "Somewhat satisfied" 3 "Neither satisfied nor dissatisfied (Do not read)" 4 "Somewhat unsatisfied" 5 "Very unsatisfied" -98 "Don’t know (Do not read)"
	label values q520 q520

	label variable q523 "523. Did you have to pay a fee during [YOUR/THE PATIENT’S] visit?"
	note q523: "523. Did you have to pay a fee during [YOUR/THE PATIENT’S] visit?"
	label define q523 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q523 q523

	label variable q524 "524. What type of fee were [YOU/THE PATIENT] charged?"
	note q524: "524. What type of fee were [YOU/THE PATIENT] charged?"
	label define q524 1 "A flat fee at the beginning of the visit that covered all services, supplies, an" 2 "Specific fees for each service, supply, or medicine used to care for [you/the pa" 3 "A combination of the two systems (i.e., a flat fee that covers some services, su" -98 "Don’t Know (Do not read)"
	label values q524 q524

	label variable q525 "525. What services, supplies, or medicines are not covered by the flat fee?"
	note q525: "525. What services, supplies, or medicines are not covered by the flat fee?"

	label variable q525_other "Other; specify"
	note q525_other: "Other; specify"

	label variable q526 "526. In total, how much were you charged during your last visit for the services"
	note q526: "526. In total, how much were you charged during your last visit for the services?"

	label variable q527 "527. In addition to these fees, did you have to make any voluntary payments in c"
	note q527: "527. In addition to these fees, did you have to make any voluntary payments in cash or kind (e.g., sugar, chicken)?"
	label define q527 1 "Yes, in cash" 2 "Yes, in kind" 3 "Yes, in cash and kind" 4 "No" -98 "Don’t know (Do not read)"
	label values q527 q527

	label variable q528 "528. What is the total estimated value of the cash and in-kind voluntary payment"
	note q528: "528. What is the total estimated value of the cash and in-kind voluntary payments?"

	label variable q530 "530. How satisfied are you with the technical competence of the staff at the hea"
	note q530: "530. How satisfied are you with the technical competence of the staff at the health center in this village/town?"
	label define q530 1 "Very satisfied" 2 "Somewhat satisfied" 3 "Neither satisfied nor dissatisfied (Do not read)" 4 "Somewhat unsatisfied" 5 "Very unsatisfied" -98 "Don’t know (Do not read)"
	label values q530 q530

	label variable q531 "531. How much would you say you trust the staff at the health center in this vil"
	note q531: "531. How much would you say you trust the staff at the health center in this village/town ?"
	label define q531 1 "A great deal" 2 "Somewhat" 3 "Very little" 4 "Not at all" -98 "Don’t know (Do not read)"
	label values q531 q531

	label variable q532 "532. How much would you say you respect the staff at the health center in this v"
	note q532: "532. How much would you say you respect the staff at the health center in this village/town?"
	label define q532 1 "A great deal" 2 "Somewhat" 3 "Very little" 4 "Not at all" -98 "Don’t know (Do not read)"
	label values q532 q532

	label variable q533 "533. What do you think about the quality of the services currently offered at th"
	note q533: "533. What do you think about the quality of the services currently offered at the health center in this village/town?"
	label define q533 1 "Very high quality" 2 "Somewhat high quality" 3 "Somewhat poor quality" 4 "Very poor quality" -98 "Don’t know (Do not read)"
	label values q533 q533

	label variable q535 "535. How often, if ever, did you have to pay a bribe, give a gift, or do a favor"
	note q535: "535. How often, if ever, did you have to pay a bribe, give a gift, or do a favor for a health worker or clinic or hospital staff in order to get the medical care needed for yourself or someone else?"
	label define q535 1 "Never" 2 "Once or twice" 3 "A few times" 4 "Often" -98 "Don’t know (Do not read)"
	label values q535 q535

	label variable q536 "536. During the past 12 months, have you received any information on the importa"
	note q536: "536. During the past 12 months, have you received any information on the importance of visiting a health facility for medical treatment and avoiding self-treatment?"
	label define q536 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q536 q536

	label variable q537 "537. Who provided this information?"
	note q537: "537. Who provided this information?"

	label variable q537_other "Other; specify"
	note q537_other: "Other; specify"

	label variable q538 "538. In health center in this village/town, health care providers know what kind"
	note q538: "538. In health center in this village/town, health care providers know what kind of care a pregnant woman needs."
	label define q538 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q538 q538

	label variable q543 "543. Nurses and other personnel at the health center in this village/town are of"
	note q543: "543. Nurses and other personnel at the health center in this village/town are often absent or show up to work late."
	label define q543 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q543 q543

	label variable q544 "544. Essential medicines at the health center in this village/town‎, are often o"
	note q544: "544. Essential medicines at the health center in this village/town‎, are often out of stock."
	label define q544 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q544 q544

	label variable q545 "545. Equipment at the health center in this village/town‎, are often missing or "
	note q545: "545. Equipment at the health center in this village/town‎, are often missing or out of order."
	label define q545 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q545 q545

	label variable q546 "546. Patients needing care have to wait a long time to be seen at health center "
	note q546: "546. Patients needing care have to wait a long time to be seen at health center in this village."
	label define q546 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q546 q546

	label variable q547 "547. The health center opens and closes at the scheduled hours."
	note q547: "547. The health center opens and closes at the scheduled hours."
	label define q547 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q547 q547

	label variable q548 "548. The health center in your village/town, charges fees that are affordable."
	note q548: "548. The health center in your village/town, charges fees that are affordable."
	label define q548 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q548 q548

	label variable q549 "549. Overall, how would you rate the condition of the building of the health cen"
	note q549: "549. Overall, how would you rate the condition of the building of the health center in this village/town‎, is?"
	label define q549 1 "Excellent condition" 2 "Good condition" 3 "Fair condition" 4 "Poor condition" -98 "Don’t know (Do not read)"
	label values q549 q549

	label variable q552 "552. If community members found out about a health worker not reporting for work"
	note q552: "552. If community members found out about a health worker not reporting for work at the health center in your village‎, what do you think are the chances that they would be able to pressure that health worker to report for work?"
	label define q552 1 "Very likely" 2 "Somewhat likely" 3 "Somewhat unlikely" 4 "Very unlikely" -98 "Don’t know (Do not read)"
	label values q552 q552

	label variable q553 "553. If community members found out about a health worker at the health center i"
	note q553: "553. If community members found out about a health worker at the health center in this village/town NOT PROVIDING THE EFFORT that he/she should in caring for his/her patients, what do you think are the chances that they would be able to pressure that health worker to apply more effort?"
	label define q553 1 "Very likely" 2 "Somewhat likely" 3 "Somewhat unlikely" 4 "Very unlikely" -98 "Don’t know (Do not read)"
	label values q553 q553

	label variable q554 "554. Do you know who is the head nurse of the health center in this village/town"
	note q554: "554. Do you know who is the head nurse of the health center in this village/town?"
	label define q554 1 "Yes" 2 "No"
	label values q554 q554

	label variable q555 "555. What is the name of the head nurse?"
	note q555: "555. What is the name of the head nurse?"
	label define q555 1 "SURNAME, GIVEN NAME" 2 "Don’t remember name (Do not read)"
	label values q555 q555

	label variable q555_name "SURNAME, GIVEN NAME"
	note q555_name: "SURNAME, GIVEN NAME"

	label variable q701 "701. In the past 12 months, have you come into contact with the CODESA?"
	note q701: "701. In the past 12 months, have you come into contact with the CODESA?"
	label define q701 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q701 q701

	label variable q703 "703. The CODESA for the Health center does a good job representing the community"
	note q703: "703. The CODESA for the Health center does a good job representing the community’s health needs"
	label define q703 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q703 q703

	label variable q704 "704. The CODESA for the Health center does a good job promoting health programs "
	note q704: "704. The CODESA for the Health center does a good job promoting health programs through sensitization of the community"
	label define q704 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q704 q704

	label variable q705 "705. The CODESA for the Health center does a good job monitoring the performance"
	note q705: "705. The CODESA for the Health center does a good job monitoring the performance of the health center."
	label define q705 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q705 q705

	label variable q706 "706. The CODESA for the Health center does a good job mobilizing the community t"
	note q706: "706. The CODESA for the Health center does a good job mobilizing the community to improve health infrastructure."
	label define q706 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q706 q706

	label variable q707 "707. Do you know who currently sits on the CODESA for the Health center ?"
	note q707: "707. Do you know who currently sits on the CODESA for the Health center ?"
	label define q707 1 "Yes" 2 "No"
	label values q707 q707

	label variable q708 "708. Please name one of the CODESA members."
	note q708: "708. Please name one of the CODESA members."
	label define q708 1 "SURNAME, GIVEN NAME" 2 "Don’t remember name (Do not read)"
	label values q708 q708

	label variable q708_name "SURNAME, GIVEN NAME"
	note q708_name: "SURNAME, GIVEN NAME"

	label variable q702 "702. What are the functions of the CODESA? (ENUMERATOR Do not read: Probe for An"
	note q702: "702. What are the functions of the CODESA? (ENUMERATOR Do not read: Probe for Anything else? Select all that apply)."

	label variable q702_other "Other; specify"
	note q702_other: "Other; specify"

	label variable q708a "708a. Overall, how satisfied would you say you are with your relationship with t"
	note q708a: "708a. Overall, how satisfied would you say you are with your relationship with the cellule d’animation communitaire (CAC)?"
	label define q708a 1 "Very satisfied" 2 "Somewhat satisfied" 3 "Neither satisfied nor dissatisfied (Do not read)" 4 "Somewhat unsatisfied" 5 "Very unsatisfied" -98 "Don’t know (Do not read)"
	label values q708a q708a

	label variable q709 "709. The CAC for the Health center does a good job promoting health programs thr"
	note q709: "709. The CAC for the Health center does a good job promoting health programs through sensitization of the community"
	label define q709 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q709 q709

	label variable q710 "710. In the past 12 months, have you come into contact with community health wor"
	note q710: "710. In the past 12 months, have you come into contact with community health workers?"
	label define q710 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q710 q710

	label variable q711 "711. In the past 2 years, has a team from the Programme de Gouvernance Integreé "
	note q711: "711. In the past 2 years, has a team from the Programme de Gouvernance Integreé (IGA) visited your health area and organized meetings to follow-up on progress made in implementing a Community-CODESA-Health Center joint action plan that aims to improve the performance of the health center?"
	label define q711 1 "Yes" 0 "No" 2 "Not that I am aware of / Not to my knowledge (Do not Read)" -98 "Don’t know (Do Not Read)"
	label values q711 q711

	label variable q712_month "Month"
	note q712_month: "Month"
	label define q712_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values q712_month q712_month

	label variable q712_year "Year"
	note q712_year: "Year"
	label define q712_year 1 "2019" 2 "2020" -98 "Don’t know (Do Not Read)"
	label values q712_year q712_year

	label variable q713 "713. Who participated in the meeting? [Select all that apply]"
	note q713: "713. Who participated in the meeting? [Select all that apply]"

	label variable q714 "714a. In the past 2 years, has the performance of the health center been formall"
	note q714: "714a. In the past 2 years, has the performance of the health center been formally assessed by the community through a participatory procedure? [ENUMERATOR Do not read: Explain participatory procedure if asked: includes community members coming together, discussing the current state of the health center, if improvements are needed, what types of improvements are needed, how the community can make the necessary changes] [DO NOT READ OPTIONS]"
	label define q714 1 "Yes" 2 "No" 3 "Not that I am aware of / Not to my knowledge (Not Read)" -98 "Don’t know (Do not read)"
	label values q714 q714

	label variable q714b_month "Q714b. Month"
	note q714b_month: "Q714b. Month"
	label define q714b_month 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
	label values q714b_month q714b_month

	label variable q714b_year "Q714b. Year"
	note q714b_year: "Q714b. Year"
	label define q714b_year 1 "2019" 2 "2020" -98 "Don’t know (Do not read)"
	label values q714b_year q714b_year

	label variable q714j "714.j To the best of your knowledge, was the assessment carried out with the sup"
	note q714j: "714.j To the best of your knowledge, was the assessment carried out with the support of any donors or programs? [can read answer choices if needed]"
	label define q714j 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q714j q714j

	label variable q714k "714.k Which donor or program supported the assessment? [do not read answer choic"
	note q714k: "714.k Which donor or program supported the assessment? [do not read answer choices; check all that apply]"

	label variable q714k_a "Other 1; specify"
	note q714k_a: "Other 1; specify"

	label variable q714k_b "Other 2; specify"
	note q714k_b: "Other 2; specify"

	label variable q714k_c "Other 3; specify"
	note q714k_c: "Other 3; specify"

	label variable q801 "801. Radio"
	note q801: "801. Radio"
	label define q801 1 "Every day" 2 "A few times a week" 3 "A few times a month" 4 "Less than once a month" 5 "Never" -98 "Don’t know (Do not read)"
	label values q801 q801

	label variable q802 "802. Television"
	note q802: "802. Television"
	label define q802 1 "Every day" 2 "A few times a week" 3 "A few times a month" 4 "Less than once a month" 5 "Never" -98 "Don’t know (Do not read)"
	label values q802 q802

	label variable q803 "803. Newspapers"
	note q803: "803. Newspapers"
	label define q803 1 "Every day" 2 "A few times a week" 3 "A few times a month" 4 "Less than once a month" 5 "Never" -98 "Don’t know (Do not read)"
	label values q803 q803

	label variable q805 "805. Social media such as Facebook, Twitter, Instagram or WhatsApp"
	note q805: "805. Social media such as Facebook, Twitter, Instagram or WhatsApp"
	label define q805 1 "Every day" 2 "A few times a week" 3 "A few times a month" 4 "Less than once a month" 5 "Never" -98 "Don’t know (Do not read)"
	label values q805 q805

	label variable q806 "806. How often do you use a mobile phone?"
	note q806: "806. How often do you use a mobile phone?"
	label define q806 1 "Every day" 2 "A few times a week" 3 "A few times a month" 4 "Less than once a month" 5 "Never" -98 "Don’t know (Do not read)"
	label values q806 q806

	label variable q807 "807. How interested would you say you are in public affairs? [ENUMERATOR Do not "
	note q807: "807. How interested would you say you are in public affairs? [ENUMERATOR Do not read: Prompt if necessary: You know, in politics and government?]"
	label define q807 1 "Not at all interested" 2 "Not very interested" 3 "Somewhat interested" 4 "Very interested" -98 "Don’t know (Do not read)"
	label values q807 q807

	label variable q808 "808. When you get together with your friends or family, would you say you discus"
	note q808: "808. When you get together with your friends or family, would you say you discuss political matters:"
	label define q808 1 "Always" 2 "Frequently" 3 "Occasionally" 4 "Never" -98 "Don’t know (Do not read)"
	label values q808 q808

	label variable q809 "809. A religious group that meets outside of regular worship services"
	note q809: "809. A religious group that meets outside of regular worship services"
	label define q809 1 "Official Leader" 2 "Active Member" 3 "Inactive Member" 4 "Not a Member" -98 "Don’t know (Do not read)"
	label values q809 q809

	label variable q810 "810. CODESA (Comité de développement de l’aire de santé)"
	note q810: "810. CODESA (Comité de développement de l’aire de santé)"
	label define q810 1 "Official Leader" 2 "Active Member" 3 "Inactive Member" 4 "Not a Member" -98 "Don’t know (Do not read)"
	label values q810 q810

	label variable q811 "811. Some other group related to health"
	note q811: "811. Some other group related to health"
	label define q811 1 "Official Leader" 2 "Active Member" 3 "Inactive Member" 4 "Not a Member" -98 "Don’t know (Do not read)"
	label values q811 q811

	label variable q812 "812. Some other voluntary association or community group"
	note q812: "812. Some other voluntary association or community group"
	label define q812 1 "Official Leader" 2 "Active Member" 3 "Inactive Member" 4 "Not a Member" -98 "Don’t know (Do not read)"
	label values q812 q812

	label variable q813 "813. How much influence do you think you can have in making this village a bette"
	note q813: "813. How much influence do you think you can have in making this village a better place to live?"
	label define q813 1 "A lot of influence" 2 "Some influence" 3 "Very little influence" 4 "No influence" -98 "Don’t know (Do not read)"
	label values q813 q813

	label variable q816 "816. People like you don't have any say about what the government does"
	note q816: "816. People like you don't have any say about what the government does"
	label define q816 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q816 q816

	label variable q817 "817. Public officials don’t care much about what people like you think [CAN READ"
	note q817: "817. Public officials don’t care much about what people like you think [CAN READ OPTIONS IF NEEDED]"
	label define q817 1 "Strongly agree" 2 "Somewhat agree" 3 "Neither agree nor disagree (Do not read)" 4 "Somewhat disagree" 5 "Strongly disagree" -98 "Don’t know (Do not read)"
	label values q817 q817

	label variable q818 "818. Some people think that people in our community have no power to improve the"
	note q818: "818. Some people think that people in our community have no power to improve the quality of health care at the health center in this village/town. Other people think that people in our community do have power to improve the quality of health care at the health center in this village/town. What do you think?"
	label define q818 1 "People in our community have A LOT OF power to improve the quality of health car" 2 "People in our community have SOME power to improve the quality of health care at" 3 "People in our community have LITTLE power to improve the quality of health care " 4 "People in our community have NO power to improve the quality of health care at t" -98 "Don’t know (Do not read)"
	label values q818 q818

	label variable q819 "819. If the government decided to increase taxes or user fees in order to improv"
	note q819: "819. If the government decided to increase taxes or user fees in order to improve public health care, would you support this decision or oppose it?"
	label define q819 1 "Strongly oppose" 2 "Somewhat oppose" 3 "Neither support nor oppose (Do not read)" 4 "Somewhat support" 5 "Strongly support" 6 "It depends (e.g., on size of the increase) (Do not read)" -98 "Don’t know (Do not read)"
	label values q819 q819

	label variable q820 "820. How well would you say the national government in Kinshasa is handling impr"
	note q820: "820. How well would you say the national government in Kinshasa is handling improving basic health services?"
	label define q820 1 "Very badly" 2 "Fairly badly" 3 "Neither badly nor well (Do not read)" 4 "Fairly well" 5 "Very well" -98 "Don’t know (Do not read)"
	label values q820 q820

	label variable q821 "821. Maintaining local roads"
	note q821: "821. Maintaining local roads"
	label define q821 1 "Very badly" 2 "Fairly badly" 3 "Neither badly nor well (Do not read)" 4 "Fairly well" 5 "Very well" -98 "Don’t know (Do not read)"
	label values q821 q821

	label variable q822 "822. Maintaining local market places"
	note q822: "822. Maintaining local market places"
	label define q822 1 "Very badly" 2 "Fairly badly" 3 "Neither badly nor well (Do not read)" 4 "Fairly well" 5 "Very well" -98 "Don’t know (Do not read)"
	label values q822 q822

	label variable q901 "901. Are you currently married or living together with a (man/woman) as if marri"
	note q901: "901. Are you currently married or living together with a (man/woman) as if married?"
	label define q901 1 "Currently single, never married or lived with someone as if married" 2 "Currently married" 3 "Currently living with a man/woman as if married" 4 "Formerly married and currently widowed" 5 "Formerly married and currently divorced" 6 "Formerly married and currently separated" 7 "Formerly lived with a man/woman as if married; he/she passed away while we were " 8 "Formerly lived with a man/woman as if married"
	label values q901 q901

	label variable q904 "904. Have you ever attended school?"
	note q904: "904. Have you ever attended school?"
	label define q904 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q904 q904

	label variable q905 "905. What is the highest level of school you attended: primary, secondary, or hi"
	note q905: "905. What is the highest level of school you attended: primary, secondary, or higher?"
	label define q905 1 "Started primary school" 2 "Finished primary school" 3 "Started high school" 4 "Finished high school" 5 "Started university" 6 "Finished university" 7 "Started technical and vocational training" 8 "Finished technical and professional training" -98 "Don’t know (Do not read)"
	label values q905 q905

	label variable q906 "906. Have you ever participated in a literacy program or any other program that "
	note q906: "906. Have you ever participated in a literacy program or any other program that involves learning to read or write (not including primary school)?"
	label define q906 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q906 q906

	label variable q907 "907. What is your native language?"
	note q907: "907. What is your native language?"
	label define q907 1 "Français" 2 "Lingala" 3 "Swahili - Haut Katanga" 4 "Swahili - South Kivu" 5 "Banyabwisha" 6 "Basanga/Sanga/Kisanga" 7 "Batetela" 8 "Kaonde" 9 "Karunda" 10 "Kibemba/Bemba" 11 "Kifulero/Kifuliro" 12 "Kihavu/Le havu" 13 "Kihunde" 14 "Kihutu/Kinyarwanda" 15 "Kikabinda/Kabinda" 16 "Kilamba/Lamba" 17 "Kilomo(twa)/Lomoto/Balomo(twa)" 18 "Kiluba/Luba" 19 "Kirega/Rega/Murega" 20 "Kishilele" 21 "Kisumbu/Musumbu" 22 "Kitabwa/Tabwa" 23 "Kitembo/Tembo/Mutembo" 24 "Kizela" 25 "Mashi" 26 "Round" 27 "Thokwe/Tshokwe" 28 "Tshiluba" 29 "Zela/Bazela" -97 "Other, specify"
	label values q907 q907

	label variable q907_other "Other; specify"
	note q907_other: "Other; specify"

	label variable q908 "908. What is your religion, if any?"
	note q908: "908. What is your religion, if any?"
	label define q908 1 "Roman Catholic" 2 "Other Christian" 3 "Muslim" 7 "None" -97 "Other; specify" -98 "Don’t know (Do not read)"
	label values q908 q908

	label variable q908_other "Other; specify"
	note q908_other: "Other; specify"

	label variable q909 "909. People practice their religion in different ways. Aside from weddings and f"
	note q909: "909. People practice their religion in different ways. Aside from weddings and funerals, how often do you personally engage in religious practices like prayer, reading a religious book, or attending a religious service or a meeting of a religious group? Would you say you do so:"
	label define q909 1 "Never" 2 "A few times a year" 3 "About once a month" 4 "About once a week" 5 "A few times a week" 6 "About once a day" 7 "More than once a day" 8 "Respondent has no religion (Do not read)" -98 "Don’t know (Do not read)"
	label values q909 q909

	label variable q910 "910. What is your tribe or ethnic group?"
	note q910: "910. What is your tribe or ethnic group?"
	label define q910 1 "Bafulero" 2 "Bahavu" 3 "Balamba/Mulamba" 4 "Balomotwa/Kilomotwa/Mulomotwa" 5 "Banyindu" 6 "Barega" 7 "Bashi" 8 "Basumbu/Kisumbu/Musumbu" 9 "Batembo" 10 "Batwa" 11 "Bemba" 12 "Hemba" 13 "Kaonde" 14 "Karunda" 15 "Lemba/Lembwe" 16 "Luba/Miluba" 17 "Lulua" 18 "Lunda" 19 "Rund" 20 "Sanga/Basanga/Kisanga/Musanga" 21 "Tabwa/Mutabwa" 22 "Thokwe" 23 "Zela/Bazela/Muzela" -97 "Other, specify"
	label values q910 q910

	label variable q910_autre "If other, please specify"
	note q910_autre: "If other, please specify"

	label variable q911 "911. Does your household get cash income from farming (agriculture, livestock, a"
	note q911: "911. Does your household get cash income from farming (agriculture, livestock, and animal products)?"
	label define q911 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q911 q911

	label variable q912 "912. Other than farming, does anyone in your household have a job that pays a ca"
	note q912: "912. Other than farming, does anyone in your household have a job that pays a cash income?"
	label define q912 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q912 q912

	label variable q913 "913. What is the main source of water used by your household?"
	note q913: "913. What is the main source of water used by your household?"
	label define q913 1 "No water source of water" 2 "Piped/Tap water" 3 "Bore hole" 4 "Pond/River/Stream/Open well/Rain tank" -97 "Other, specify" -98 "Don’t know (Do not read)"
	label values q913 q913

	label variable q913_other "Other; specify"
	note q913_other: "Other; specify"

	label variable q914 "914. Do you do anything to the water to make it safer to drink?"
	note q914: "914. Do you do anything to the water to make it safer to drink?"
	label define q914 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q914 q914

	label variable q915 "915. What do you usually do to make the water safer to drink? Anything else?"
	note q915: "915. What do you usually do to make the water safer to drink? Anything else?"

	label variable q915_other "Other; specify"
	note q915_other: "Other; specify"

	label variable q916 "916. What kind of toilet facility do members of your household usually use?"
	note q916: "916. What kind of toilet facility do members of your household usually use?"

	label variable q916_other "Other; specify"
	note q916_other: "Other; specify"

	label variable q917 "917. Do you have soap or other sanitizing products (or other local products used"
	note q917: "917. Do you have soap or other sanitizing products (or other local products used like sanitizing products) in your house for hand washing after using the toilet?"
	label define q917 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
	label values q917 q917

	label variable q919_a "A. Electricity?"
	note q919_a: "A. Electricity?"
	label define q919_a 1 "Yes" 2 "No"
	label values q919_a q919_a

	label variable q919_a_num "How many hours of electricity do you have per day?"
	note q919_a_num: "How many hours of electricity do you have per day?"

	label variable q919_b "B. A radio?"
	note q919_b: "B. A radio?"
	label define q919_b 1 "Yes" 2 "No"
	label values q919_b q919_b

	label variable q919_b_num "How many?"
	note q919_b_num: "How many?"

	label variable q919_c "C. A television?"
	note q919_c: "C. A television?"
	label define q919_c 1 "Yes" 2 "No"
	label values q919_c q919_c

	label variable q919_c_num "How many?"
	note q919_c_num: "How many?"

	label variable q919_d "D. A bicycle?"
	note q919_d: "D. A bicycle?"
	label define q919_d 1 "Yes" 2 "No"
	label values q919_d q919_d

	label variable q919_d_num "How many?"
	note q919_d_num: "How many?"

	label variable q919_e "E. A motorcycle or motor scooter?"
	note q919_e: "E. A motorcycle or motor scooter?"
	label define q919_e 1 "Yes" 2 "No"
	label values q919_e q919_e

	label variable q919_e_num "How many?"
	note q919_e_num: "How many?"

	label variable q919_f "F. An animal-drawn cart?"
	note q919_f: "F. An animal-drawn cart?"
	label define q919_f 1 "Yes" 2 "No"
	label values q919_f q919_f

	label variable q919_f_num "How many?"
	note q919_f_num: "How many?"

	label variable q919_g "G. A car or truck?"
	note q919_g: "G. A car or truck?"
	label define q919_g 1 "Yes" 2 "No"
	label values q919_g q919_g

	label variable q919_g_num "How many?"
	note q919_g_num: "How many?"

	label variable q919_i "I. Milk cows or bulls"
	note q919_i: "I. Milk cows or bulls"
	label define q919_i 1 "Yes" 2 "No"
	label values q919_i q919_i

	label variable q919_i_num "How many?"
	note q919_i_num: "How many?"

	label variable q919_k "K. Horses, donkeys, or mules"
	note q919_k: "K. Horses, donkeys, or mules"
	label define q919_k 1 "Yes" 2 "No"
	label values q919_k q919_k

	label variable q919_k_num "How many?"
	note q919_k_num: "How many?"

	label variable q919_l "L. Goats"
	note q919_l: "L. Goats"
	label define q919_l 1 "Yes" 2 "No"
	label values q919_l q919_l

	label variable q919_l_num "How many?"
	note q919_l_num: "How many?"

	label variable q919_m "M. Sheep"
	note q919_m: "M. Sheep"
	label define q919_m 1 "Yes" 2 "No"
	label values q919_m q919_m

	label variable q919_m_num "How many?"
	note q919_m_num: "How many?"

	label variable q919_n "N. Chickens or other poultry"
	note q919_n: "N. Chickens or other poultry"
	label define q919_n 1 "Yes" 2 "No"
	label values q919_n q919_n

	label variable q919_n_num "How many?"
	note q919_n_num: "How many?"

	label variable q919_o "O. Agricultural land"
	note q919_o: "O. Agricultural land"
	label define q919_o 1 "Yes" 2 "No"
	label values q919_o q919_o

	label variable q919_o_num "About how many hectares of land does your household have? 1 hectare is slightly "
	note q919_o_num: "About how many hectares of land does your household have? 1 hectare is slightly smaller than a full-sized football pitch. (Do not read: if respondent has more than one plot, estimate the total size of all plots added together.)"
	label define q919_o_num 1 "0 – 0.25 hectare" 2 "0.5 hectare" 3 "0.75 hectare" 4 "1 hectare" 5 "More than 1 hectare"
	label values q919_o_num q919_o_num

	label variable q919_o_more "More than 1 hectare, please specify:"
	note q919_o_more: "More than 1 hectare, please specify:"

	label variable q919_p "P. A mosquito net?"
	note q919_p: "P. A mosquito net?"
	label define q919_p 1 "Yes" 2 "No"
	label values q919_p q919_p

	label variable q919_p_num "How many?"
	note q919_p_num: "How many?"

	label variable move1 "Have you changed house in the past 12 months?"
	note move1: "Have you changed house in the past 12 months?"
	label define move1 1 "Yes" 2 "No"
	label values move1 move1

	label variable migration1 "Migration1. Are there certain times of the year when people in this village are "
	note migration1: "Migration1. Are there certain times of the year when people in this village are away from their house or this village for an extended amount of time? For example, they might go elsewhere for farming purposes or to attend a festival that occurs every year"
	label define migration1 1 "Yes" 2 "No"
	label values migration1 migration1

	label variable migration1a "Migration1a. Where do they go and why are they away?"
	note migration1a: "Migration1a. Where do they go and why are they away?"

	label variable migration1b "Migration1b. When do they usually leave?"
	note migration1b: "Migration1b. When do they usually leave?"

	label variable migration1c "Migration1c. When do they usually return?"
	note migration1c: "Migration1c. When do they usually return?"

	label variable migration2 "Migration2. Are there certain times of the year when you are away from your hous"
	note migration2: "Migration2. Are there certain times of the year when you are away from your house or this village for an extended amount of time? For example, you might go elsewhere for farming purposes or to attend a festival that occurs every year."
	label define migration2 1 "Yes" 2 "No"
	label values migration2 migration2

	label variable migration2a "Migration2a. Where do you go and why are you away?"
	note migration2a: "Migration2a. Where do you go and why are you away?"

	label variable migration2b "Migration2b. When do you usually leave?"
	note migration2b: "Migration2b. When do you usually leave?"

	label variable migration2c "Migration2c. When do you usually return?"
	note migration2c: "Migration2c. When do you usually return?"

	label variable migration3 "Migration3. Are there certain days of the week when you are away from your house"
	note migration3: "Migration3. Are there certain days of the week when you are away from your house attending a regularly scheduled event or festivity? For example, there might be a large market day in your village or a nearby village every week or two."
	label define migration3 1 "Yes" 2 "No"
	label values migration3 migration3

	label variable migration3a "Migration3a. What is the event and where does it take place?"
	note migration3a: "Migration3a. What is the event and where does it take place?"

	label variable migration3b "Migration3b. When does it take place?"
	note migration3b: "Migration3b. When does it take place?"

	label variable phone_permission "Q12. Could you provide me with your phone number in case we would like to contac"
	note phone_permission: "Q12. Could you provide me with your phone number in case we would like to contact you in the future?"
	label define phone_permission 1 "Yes" 2 "No"
	label values phone_permission phone_permission

	label variable phone_number "Q12a. Enter phone number:"
	note phone_number: "Q12a. Enter phone number:"

	label variable end_time_of_intervew "End time to be manually entered by enumerator consulting his/her watch/phone, no"
	note end_time_of_intervew: "End time to be manually entered by enumerator consulting his/her watch/phone, not the device."

	label variable s1_15_2 "16A. Interview"
	note s1_15_2: "16A. Interview"
	label define s1_15_2 1 "Completed" 2 "Partially completed; will not be completed at a later date" 3 "Partially completed; will be completed at a later date" -97 "Other, specify"
	label values s1_15_2 s1_15_2

	label variable s1_15_2_other "16A_autre. Other, specify"
	note s1_15_2_other: "16A_autre. Other, specify"

	label variable q15_refuse "Reason for refusal:"
	note q15_refuse: "Reason for refusal:"

	label variable urbanrural "Is this area urban or rural?"
	note urbanrural: "Is this area urban or rural?"
	label define urbanrural 1 "Urban" 2 "Rural"
	label values urbanrural urbanrural

	label variable q1001 "Floor"
	note q1001: "Floor"
	label define q1001 1 "Earth/sand" 2 "Wood planks" 3 "Ceramic tiles" 4 "Cement" 5 "Carpet" -97 "Other, specify:"
	label values q1001 q1001

	label variable q1001_other "Other; specify"
	note q1001_other: "Other; specify"

	label variable q1002 "Roofing"
	note q1002: "Roofing"
	label define q1002 1 "No roof" 2 "Tiled roof" 3 "Metal" 4 "Wood planks" 5 "Thatch/palm (or any other vegetal) leaf" -97 "Other, specify:"
	label values q1002 q1002

	label variable q1002_c_other "Other; specify"
	note q1002_c_other: "Other; specify"

	label variable q1004 "1003. In your opinion, how cooperative was the respondent?"
	note q1004: "1003. In your opinion, how cooperative was the respondent?"
	label define q1004 1 "Cooperative" 2 "In between" 3 "Uncooperative"
	label values q1004 q1004

	label variable q1005 "1004. In your opinion, how honest was the respondent when answering?"
	note q1005: "1004. In your opinion, how honest was the respondent when answering?"
	label define q1005 1 "Honest" 2 "In between" 3 "Misleading"
	label values q1005 q1005

	label variable q1006 "1005. In your opinion, how interested was the respondent?"
	note q1006: "1005. In your opinion, how interested was the respondent?"
	label define q1006 1 "Interested" 2 "In between" 3 "Uninterested"
	label values q1006 q1006

	label variable q1007 "1006. Did the respondent check with others for information to answer any questio"
	note q1007: "1006. Did the respondent check with others for information to answer any question?"
	label define q1007 1 "Yes" 2 "No"
	label values q1007 q1007

	label variable q1008 "1007. Do you think anyone influenced the respondent’s answers during the intervi"
	note q1008: "1007. Do you think anyone influenced the respondent’s answers during the interview?"
	label define q1008 1 "Yes" 2 "No"
	label values q1008 q1008

	label variable q1009 "1008. Spoken Language of interview"
	note q1009: "1008. Spoken Language of interview"
	label define q1009 1 "Kikongo" 2 "Lingala" 3 "Swahili - Haut Katanga" 4 "Swahili - South Kivu" 5 "Tshiluba" 6 "French" -97 "Other, specify"
	label values q1009 q1009

	label variable q1009_other "Other; specify"
	note q1009_other: "Other; specify"

	label variable q1010 "1009. ENUMERATOR comments (Open-ended)"
	note q1010: "1009. ENUMERATOR comments (Open-ended)"

	label variable q5latitude "Please Collect the GPS coordinates (latitude)"
	note q5latitude: "Please Collect the GPS coordinates (latitude)"

	label variable q5longitude "Please Collect the GPS coordinates (longitude)"
	note q5longitude: "Please Collect the GPS coordinates (longitude)"

	label variable q5altitude "Please Collect the GPS coordinates (altitude)"
	note q5altitude: "Please Collect the GPS coordinates (altitude)"

	label variable q5accuracy "Please Collect the GPS coordinates (accuracy)"
	note q5accuracy: "Please Collect the GPS coordinates (accuracy)"



	capture {
		foreach rgvar of varlist q110a_* {
			label variable `rgvar' "110a. Name of household member #\${resp_pos_mem}"
			note `rgvar': "110a. Name of household member #\${resp_pos_mem}"
		}
	}

	capture {
		foreach rgvar of varlist q111_* {
			label variable `rgvar' "111. What is \${q110a}’s gender?"
			note `rgvar': "111. What is \${q110a}’s gender?"
			label define `rgvar' 1 "Male" 2 "Female"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q113_* {
			label variable `rgvar' "113. What is \${q110a}’s age?"
			note `rgvar': "113. What is \${q110a}’s age?"
		}
	}

	capture {
		foreach rgvar of varlist q116a_* {
			label variable `rgvar' "116a. \${current_name_label} is \${current_child_age} years old. Was \${current_"
			note `rgvar': "116a. \${current_name_label} is \${current_child_age} years old. Was \${current_name_label} born in \${child_year1} or \${child_year2}?"
			label define `rgvar' 1 "\${child_year1}" 2 "\${child_year2}"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q116b_* {
			label variable `rgvar' "116b. In which month of \${child_actual_year} was \${current_name_label} born? I"
			note `rgvar': "116b. In which month of \${child_actual_year} was \${current_name_label} born? If you do not know or are not sure, please give me your best guess."
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q116c_* {
			label variable `rgvar' "116c. In which day of \${child_month} of \${child_actual_year} was \${current_na"
			note `rgvar': "116c. In which day of \${child_month} of \${child_actual_year} was \${current_name_label} born?"
		}
	}

	capture {
		foreach rgvar of varlist q117_* {
			label variable `rgvar' "117. Does this child (\${current_name_label}) depend mainly on you?"
			note `rgvar': "117. Does this child (\${current_name_label}) depend mainly on you?"
			label define `rgvar' 1 "Yes" 2 "No"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q201_* {
			label variable `rgvar' "201. Do you have a card or other document where (\${dependent_yes}'s) vaccinatio"
			note `rgvar': "201. Do you have a card or other document where (\${dependent_yes}'s) vaccinations are written down?"
			label define `rgvar' 1 "Yes, has only a card" 2 "Yes, has only another document" 3 "Yes, has card and another document" 4 "No, no card and no other document" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q202_* {
			label variable `rgvar' "202. May I see the card or other document where (\${dependent_yes}) vaccinations"
			note `rgvar': "202. May I see the card or other document where (\${dependent_yes}) vaccinations are written down?"
			label define `rgvar' 1 "Yes, only card seen" 2 "Yes, only other document seen" 3 "Yes, card and other document seen" 4 "No card and no other document seen" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q205_* {
			label variable `rgvar' "205. Did (\${dependent_yes}) ever receive any vaccinations to prevent him/her fr"
			note `rgvar': "205. Did (\${dependent_yes}) ever receive any vaccinations to prevent him/her from getting diseases, including vaccinations received in campaigns or immunization days or child health days?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q206_* {
			label variable `rgvar' "206. Has (\${dependent_yes}) ever received a vaccination against tuberculosis, t"
			note `rgvar': "206. Has (\${dependent_yes}) ever received a vaccination against tuberculosis, that is, an injection in the arm or shoulder that usually causes a scar?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q206_1_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q206_2_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q206_3_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_* {
			label variable `rgvar' "207. Has (\${dependent_yes}) ever received oral polio vaccine, that is, about tw"
			note `rgvar': "207. Has (\${dependent_yes}) ever received oral polio vaccine, that is, about two drops in the mouth to prevent polio?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q208_* {
			label variable `rgvar' "208. How many times did (\${dependent_yes}) receive the oral polio vaccine? [ENU"
			note `rgvar': "208. How many times did (\${dependent_yes}) receive the oral polio vaccine? [ENUMERATOR Do not read: Record the number of times] (###)"
		}
	}

	capture {
		foreach rgvar of varlist q207_1_1_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q207_2_1_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_3_1_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_1_2_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q207_2_2_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_3_2_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_1_3_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q207_2_3_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_3_3_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_1_4_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q207_2_4_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q207_3_4_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_* {
			label variable `rgvar' "209. Has (\${dependent_yes}) ever received a pentavalent vaccination, that is, a"
			note `rgvar': "209. Has (\${dependent_yes}) ever received a pentavalent vaccination, that is, an injection given in the thigh sometimes at the same time as polio drops to prevent diphteria, tetanus, pertusis, hepatitis B, and influenza?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q210_* {
			label variable `rgvar' "210. How many times did (\${dependent_yes}) receive the pentavalent vaccine? [EN"
			note `rgvar': "210. How many times did (\${dependent_yes}) receive the pentavalent vaccine? [ENUMERATOR Do not read: Record the number of times] (###)"
		}
	}

	capture {
		foreach rgvar of varlist q209_1_1_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q209_2_1_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_3_1_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_1_2_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q209_2_2_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_3_2_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_1_3_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q209_2_3_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q209_3_3_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_* {
			label variable `rgvar' "211. Has (\${dependent_yes}) ever received a pneumococcal vaccination, that is, "
			note `rgvar': "211. Has (\${dependent_yes}) ever received a pneumococcal vaccination, that is, an injection in the thigh to prevent pneumonia?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q212_* {
			label variable `rgvar' "212. How many times did (\${dependent_yes}) receive the pneumococcal vaccine? [E"
			note `rgvar': "212. How many times did (\${dependent_yes}) receive the pneumococcal vaccine? [ENUMERATOR Do not read: Record the number of times] (###)"
		}
	}

	capture {
		foreach rgvar of varlist q211_1_1_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q211_2_1_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_3_1_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_1_2_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q211_2_2_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_3_2_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_1_3_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q211_2_3_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q211_3_3_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q213_* {
			label variable `rgvar' "213. Has (\${dependent_yes}) ever received a measles vaccination, that is, an in"
			note `rgvar': "213. Has (\${dependent_yes}) ever received a measles vaccination, that is, an injection in the arm to prevent measles?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q213_1_* {
			label variable `rgvar' "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day: ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q213_2_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q213_3_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2015" 2 "2016" 3 "2017" 4 "2018" 5 "2019" 6 "2020" -98 "Don't know (DO NOT READ)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q215_* {
			label variable `rgvar' "215. In the last six months, was (\${dependent_yes}) given a vitamin A dose like"
			note `rgvar': "215. In the last six months, was (\${dependent_yes}) given a vitamin A dose like [this/any of these]? [ENUMERATOR Do not read: Show common types of ampules/capsules/syrups] [CAN READ OPTIONS IF NEEDED]"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q216_* {
			label variable `rgvar' "216. In the last six months, was (\${dependent_yes}) given iron pills, sprinkles"
			note `rgvar': "216. In the last six months, was (\${dependent_yes}) given iron pills, sprinkles with iron, or iron syrup like [this/any of these]? [ENUMERATOR Do not read: Show common types of ampules/capsules/syrups] [CAN READ OPTIONS IF NEEDED]"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q217_* {
			label variable `rgvar' "217. In the last six months, was (\${dependent_yes}) given any drug for intestin"
			note `rgvar': "217. In the last six months, was (\${dependent_yes}) given any drug for intestinal worms? [CAN READ OPTIONS IF NEEDED]"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q218_* {
			label variable `rgvar' "218. Has (\${dependent_yes}) had diarrhea in the last 2 weeks?"
			note `rgvar': "218. Has (\${dependent_yes}) had diarrhea in the last 2 weeks?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q219_* {
			label variable `rgvar' "219. Did you seek advice or treatment for the diarrhea from any source?"
			note `rgvar': "219. Did you seek advice or treatment for the diarrhea from any source?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q220_* {
			label variable `rgvar' "220. Where did you seek advice or treatment? [ENUMERATOR PROBE: Anywhere else?] "
			note `rgvar': "220. Where did you seek advice or treatment? [ENUMERATOR PROBE: Anywhere else?] [Check all that apply]"
		}
	}

	capture {
		foreach rgvar of varlist q220a_* {
			label variable `rgvar' "220a. Other, specify:"
			note `rgvar': "220a. Other, specify:"
		}
	}

	capture {
		foreach rgvar of varlist q221_* {
			label variable `rgvar' "221. Where did you first seek advice or treatment?"
			note `rgvar': "221. Where did you first seek advice or treatment?"
			label define `rgvar' 1 "Hospital" 2 "Health Center in your health area" 3 "Other Health Center" 4 "Health Post" 5 "Dispensary" 6 "Private Doctor" 7 "Mobile Clinic" 8 "Community health worker" 9 "Pharmacy" 10 "Traditional practitioner/healer" 11 "Itinerant drug seller" 12 "Market vendor" -97 "\${q220a}" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q222_* {
			label variable `rgvar' "222. How many days after the illness began did you first seek advice or treatmen"
			note `rgvar': "222. How many days after the illness began did you first seek advice or treatment? [ENUMERATOR Do not read: If same day, record 00] (##)"
		}
	}

	capture {
		foreach rgvar of varlist q223_* {
			label variable `rgvar' "223. Was (\${dependent_yes}) given any of the following at any time since(\${dep"
			note `rgvar': "223. Was (\${dependent_yes}) given any of the following at any time since(\${dependent_yes}) started having the diarrhea? [ENUMERATOR do not read: Probe for anything else? And check all that apply]"
		}
	}

	capture {
		foreach rgvar of varlist q223a_* {
			label variable `rgvar' "223a. Other, specify:"
			note `rgvar': "223a. Other, specify:"
		}
	}

	capture {
		foreach rgvar of varlist q223b_* {
			label variable `rgvar' "223b. Other pill or syrup (not antibiotic or Antimotility) Please specify:"
			note `rgvar': "223b. Other pill or syrup (not antibiotic or Antimotility) Please specify:"
		}
	}

	capture {
		foreach rgvar of varlist q224_* {
			label variable `rgvar' "224. Has (\${dependent_yes}) been ill with a fever at any time in the last 2 wee"
			note `rgvar': "224. Has (\${dependent_yes}) been ill with a fever at any time in the last 2 weeks?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q225_* {
			label variable `rgvar' "225. At any time during the illness, did (\${dependent_yes}) have blood taken fr"
			note `rgvar': "225. At any time during the illness, did (\${dependent_yes}) have blood taken from (\${dependent_yes}) finger or heel for testing?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q226_* {
			label variable `rgvar' "226. Has (\${dependent_yes}) had an illness with a cough at any time in the last"
			note `rgvar': "226. Has (\${dependent_yes}) had an illness with a cough at any time in the last 2 weeks?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q227_* {
			label variable `rgvar' "227. Has (\${dependent_yes}) had fast, short, rapid breaths or difficulty breath"
			note `rgvar': "227. Has (\${dependent_yes}) had fast, short, rapid breaths or difficulty breathing at any time in the last 2 weeks?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q228_* {
			label variable `rgvar' "228. Did you seek advice or treatment for the illness from any source?"
			note `rgvar': "228. Did you seek advice or treatment for the illness from any source?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q229_* {
			label variable `rgvar' "229. Where did you seek advice or treatment? [ENUMERATOR Do not read: Probe for "
			note `rgvar': "229. Where did you seek advice or treatment? [ENUMERATOR Do not read: Probe for Anywhere else? Check all that apply]"
		}
	}

	capture {
		foreach rgvar of varlist q229a_* {
			label variable `rgvar' "229a. Other, specify:"
			note `rgvar': "229a. Other, specify:"
		}
	}

	capture {
		foreach rgvar of varlist q230_* {
			label variable `rgvar' "230. Where did you first seek advice or treatment?"
			note `rgvar': "230. Where did you first seek advice or treatment?"
			label define `rgvar' 1 "Hospital" 2 "Health Center in your health area" 3 "Other Health Center" 4 "Health Post" 5 "Dispensary" 6 "Private Doctor" 7 "Mobile Clinic" 8 "Community health worker" 9 "Pharmacy" 10 "Traditional practitioner/healer" 11 "Itinerant drug seller" 12 "Market vendor" -97 "\${q220a}" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q230a_* {
			label variable `rgvar' "230a. Other, specify:"
			note `rgvar': "230a. Other, specify:"
		}
	}

	capture {
		foreach rgvar of varlist q231_* {
			label variable `rgvar' "231. How many days after the illness began did you first seek advice or treatmen"
			note `rgvar': "231. How many days after the illness began did you first seek advice or treatment? [If same day, record 00]: (###)"
		}
	}

	capture {
		foreach rgvar of varlist q232_* {
			label variable `rgvar' "232. At any time during the illness was (\${dependent_yes}) given any of the fol"
			note `rgvar': "232. At any time during the illness was (\${dependent_yes}) given any of the following drugs? [ENUMERATOR Do not read: Probe for Anywhere else? Check all that apply]"
		}
	}

	capture {
		foreach rgvar of varlist q232a_* {
			label variable `rgvar' "232a. Other, specify:"
			note `rgvar': "232a. Other, specify:"
		}
	}

	capture {
		foreach rgvar of varlist q303_list_* {
			label variable `rgvar' "303. Name of respondent #\${preg_pos}"
			note `rgvar': "303. Name of respondent #\${preg_pos}"
			label define `rgvar' 1 "#1: \${name_w_1}, Age \${resp_age_w_1} years" 2 "#2: \${name_w_2}, Age \${resp_age_w_2} years" 3 "#3: \${name_w_3}, Age \${resp_age_w_3} years" 4 "#4: \${name_w_4}, Age \${resp_age_w_4} years" 5 "#5: \${name_w_5}, Age \${resp_age_w_5} years" 6 "#6: \${name_w_6}, Age \${resp_age_w_6} years" 7 "#7: \${name_w_7}, Age \${resp_age_w_7} years" 8 "#8: \${name_w_8}, Age \${resp_age_w_8} years" 9 "#9: \${name_w_9}, Age \${resp_age_w_9} years" 10 "#10: \${name_w_10}, Age \${resp_age_w_10} years" 11 "#11: \${name_w_11}, Age \${resp_age_w_11} years" 12 "#12: \${name_w_12}, Age \${resp_age_w_12} years" 13 "#13: \${name_w_13}, Age \${resp_age_w_13} years" 14 "#14: \${name_w_14}, Age \${resp_age_w_14} years" 15 "#15: \${name_w_15}, Age \${resp_age_w_15} years" 16 "#16: \${name_w_16}, Age \${resp_age_w_16} years" 17 "#17: \${name_w_17}, Age \${resp_age_w_17} years" 18 "#18: \${name_w_18}, Age \${resp_age_w_18} years" 19 "#19: \${name_w_19}, Age \${resp_age_w_19} years" 20 "#20: \${name_w_20}, Age \${resp_age_w_20} years"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q321_list_* {
			label variable `rgvar' "321. Can you please give me the names of women # \${gbirth_pos} between the ages"
			note `rgvar': "321. Can you please give me the names of women # \${gbirth_pos} between the ages of 15 and 45 who have given birth in the past 24 months?"
			label define `rgvar' 1 "#1: \${name_w_1}, Age \${resp_age_w_1} years" 2 "#2: \${name_w_2}, Age \${resp_age_w_2} years" 3 "#3: \${name_w_3}, Age \${resp_age_w_3} years" 4 "#4: \${name_w_4}, Age \${resp_age_w_4} years" 5 "#5: \${name_w_5}, Age \${resp_age_w_5} years" 6 "#6: \${name_w_6}, Age \${resp_age_w_6} years" 7 "#7: \${name_w_7}, Age \${resp_age_w_7} years" 8 "#8: \${name_w_8}, Age \${resp_age_w_8} years" 9 "#9: \${name_w_9}, Age \${resp_age_w_9} years" 10 "#10: \${name_w_10}, Age \${resp_age_w_10} years" 11 "#11: \${name_w_11}, Age \${resp_age_w_11} years" 12 "#12: \${name_w_12}, Age \${resp_age_w_12} years" 13 "#13: \${name_w_13}, Age \${resp_age_w_13} years" 14 "#14: \${name_w_14}, Age \${resp_age_w_14} years" 15 "#15: \${name_w_15}, Age \${resp_age_w_15} years" 16 "#16: \${name_w_16}, Age \${resp_age_w_16} years" 17 "#17: \${name_w_17}, Age \${resp_age_w_17} years" 18 "#18: \${name_w_18}, Age \${resp_age_w_18} years" 19 "#19: \${name_w_19}, Age \${resp_age_w_19} years" 20 "#20: \${name_w_20}, Age \${resp_age_w_20} years"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q322a_* {
			label variable `rgvar' "322. When did \${q321} give birth? Day:"
			note `rgvar': "322. When did \${q321} give birth? Day:"
		}
	}

	capture {
		foreach rgvar of varlist q322b_* {
			label variable `rgvar' "322b. Month: (####)"
			note `rgvar': "322b. Month: (####)"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q322c_* {
			label variable `rgvar' "322c. Year: (####)"
			note `rgvar': "322c. Year: (####)"
		}
	}

	capture {
		foreach rgvar of varlist q402_* {
			label variable `rgvar' "402. What was the name of the child #\${resp_pos_403}? (ENUMERATOR Do not read: "
			note `rgvar': "402. What was the name of the child #\${resp_pos_403}? (ENUMERATOR Do not read: Record NONE for any infant who did not have a name at time of death.)"
		}
	}

	capture {
		foreach rgvar of varlist q403_* {
			label variable `rgvar' "403. Was \${q402} a boy or a girl?"
			note `rgvar': "403. Was \${q402} a boy or a girl?"
			label define `rgvar' 1 "Boy" 2 "Girl"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q404_day_* {
			label variable `rgvar' "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q404_month_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q404_year_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2019" 2 "2020" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q407_* {
			label variable `rgvar' "407. What was the name of the child #\${resp_pos_408}?"
			note `rgvar': "407. What was the name of the child #\${resp_pos_408}?"
		}
	}

	capture {
		foreach rgvar of varlist q408_* {
			label variable `rgvar' "408. Was \${q407} a boy or a girl?"
			note `rgvar': "408. Was \${q407} a boy or a girl?"
			label define `rgvar' 1 "Boy" 2 "Girl"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q409_* {
			label variable `rgvar' "409. At what age did \${q407} die?"
			note `rgvar': "409. At what age did \${q407} die?"
			label define `rgvar' 1 "YEARS" 2 "MONTHS"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q409a_num_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
		}
	}

	capture {
		foreach rgvar of varlist q409b_num_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
		}
	}

	capture {
		foreach rgvar of varlist q410_day_* {
			label variable `rgvar' "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q410_month_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q410_year_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2019" 2 "2020" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q415_* {
			label variable `rgvar' "415. What was the name of the woman #\${resp_pos_414}?"
			note `rgvar': "415. What was the name of the woman #\${resp_pos_414}?"
		}
	}

	capture {
		foreach rgvar of varlist q416_* {
			label variable `rgvar' "416. Do you remember the month and year of the death?"
			note `rgvar': "416. Do you remember the month and year of the death?"
			label define `rgvar' 1 "Yes" 2 "No"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q417_day_* {
			label variable `rgvar' "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
			note `rgvar': "Day ENUMERATOR Do not read: enter -98 if informant cannot recall day"
		}
	}

	capture {
		foreach rgvar of varlist q417_month_* {
			label variable `rgvar' "Month"
			note `rgvar': "Month"
			label define `rgvar' 1 "January" 2 "February" 3 "March" 4 "April" 5 "May" 6 "June" 7 "July" 8 "August" 9 "September" 10 "October" 11 "November" 12 "December" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q417_year_* {
			label variable `rgvar' "Year"
			note `rgvar': "Year"
			label define `rgvar' 1 "2018" 2 "2019" 3 "2020" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q418_* {
			label variable `rgvar' "418. What was her age (in Years) at the time of death?"
			note `rgvar': "418. What was her age (in Years) at the time of death?"
		}
	}

	capture {
		foreach rgvar of varlist q419_* {
			label variable `rgvar' "419. Was \${q415} pregnant when she died?"
			note `rgvar': "419. Was \${q415} pregnant when she died?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q420_* {
			label variable `rgvar' "420. Did \${q415} die within two months after the end of a pregnancy or childbir"
			note `rgvar': "420. Did \${q415} die within two months after the end of a pregnancy or childbirth?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}

	capture {
		foreach rgvar of varlist q421_* {
			label variable `rgvar' "421. Was the death related to the end of the pregnancy or the childbirth?"
			note `rgvar': "421. Was the death related to the end of the pregnancy or the childbirth?"
			label define `rgvar' 1 "Yes" 2 "No" -98 "Don’t know (Do not read)"
			label values `rgvar' `rgvar'
		}
	}




	* append old, previously-imported data (if any)
	cap confirm file "`dtafile'"
	if _rc == 0 {
		* mark all new data before merging with old data
		gen new_data_row=1
		
		* pull in old data
		append using "`dtafile'"
		
		* drop duplicates in favor of old, previously-imported data if overwrite_old_data is 0
		* (alternatively drop in favor of new data if overwrite_old_data is 1)
		sort key
		by key: gen num_for_key = _N
		drop if num_for_key > 1 & ((`overwrite_old_data' == 0 & new_data_row == 1) | (`overwrite_old_data' == 1 & new_data_row ~= 1))
		drop num_for_key

		* drop new-data flag
		drop new_data_row
	}
	
	* save data to Stata format
	save "`dtafile'", replace

	* show codebook and notes
	codebook
	notes list
}

disp
disp "Finished import of: `csvfile'"
disp

* OPTIONAL: LOCALLY-APPLIED STATA CORRECTIONS
*
* Rather than using SurveyCTO's review and correction workflow, the code below can apply a list of corrections
* listed in a local .csv file. Feel free to use, ignore, or delete this code.
*
*   Corrections file path and filename:  G:/Shared drives/IMC GEFA WASH/Wave 1/DRC/Data collection/Raw Data/Quantitative/NORC-IGA-Endline-Menage_corrections.csv
*
*   Corrections file columns (in order): key, fieldname, value, notes

capture confirm file "`corrfile'"
if _rc==0 {
	disp
	disp "Starting application of corrections in: `corrfile'"
	disp

	* save primary data in memory
	preserve

	* load corrections
	insheet using "`corrfile'", names clear
	
	if _N>0 {
		* number all rows (with +1 offset so that it matches row numbers in Excel)
		gen rownum=_n+1
		
		* drop notes field (for information only)
		drop notes
		
		* make sure that all values are in string format to start
		gen origvalue=value
		tostring value, format(%100.0g) replace
		cap replace value="" if origvalue==.
		drop origvalue
		replace value=trim(value)
		
		* correct field names to match Stata field names (lowercase, drop -'s and .'s)
		replace fieldname=lower(subinstr(subinstr(fieldname,"-","",.),".","",.))
		
		* format date and date/time fields (taking account of possible wildcards for repeat groups)
		forvalues i = 1/100 {
			if "`datetime_fields`i''" ~= "" {
				foreach dtvar in `datetime_fields`i'' {
					* skip fields that aren't yet in the data
					cap unab dtvarignore : `dtvar'
					if _rc==0 {
						gen origvalue=value
						replace value=string(clock(value,"MDYhms",2025),"%25.0g") if strmatch(fieldname,"`dtvar'")
						* allow for cases where seconds haven't been specified
						replace value=string(clock(origvalue,"MDYhm",2025),"%25.0g") if strmatch(fieldname,"`dtvar'") & value=="." & origvalue~="."
						drop origvalue
					}
				}
			}
			if "`date_fields`i''" ~= "" {
				foreach dtvar in `date_fields`i'' {
					* skip fields that aren't yet in the data
					cap unab dtvarignore : `dtvar'
					if _rc==0 {
						replace value=string(clock(value,"MDY",2025),"%25.0g") if strmatch(fieldname,"`dtvar'")
					}
				}
			}
		}

		* write out a temp file with the commands necessary to apply each correction
		tempfile tempdo
		file open dofile using "`tempdo'", write replace
		local N = _N
		forvalues i = 1/`N' {
			local fieldnameval=fieldname[`i']
			local valueval=value[`i']
			local keyval=key[`i']
			local rownumval=rownum[`i']
			file write dofile `"cap replace `fieldnameval'="`valueval'" if key=="`keyval'""' _n
			file write dofile `"if _rc ~= 0 {"' _n
			if "`valueval'" == "" {
				file write dofile _tab `"cap replace `fieldnameval'=. if key=="`keyval'""' _n
			}
			else {
				file write dofile _tab `"cap replace `fieldnameval'=`valueval' if key=="`keyval'""' _n
			}
			file write dofile _tab `"if _rc ~= 0 {"' _n
			file write dofile _tab _tab `"disp"' _n
			file write dofile _tab _tab `"disp "CAN'T APPLY CORRECTION IN ROW #`rownumval'""' _n
			file write dofile _tab _tab `"disp"' _n
			file write dofile _tab `"}"' _n
			file write dofile `"}"' _n
		}
		file close dofile
	
		* restore primary data
		restore
		
		* execute the .do file to actually apply all corrections
		do "`tempdo'"

		* re-save data
		save "`dtafile'", replace
	}
	else {
		* restore primary data		
		restore
	}

	disp
	disp "Finished applying corrections in: `corrfile'"
	disp
}


********************************************************************************
********************************************************************************
********************************************************************************
*                                 CLEANING                                     *
********************************************************************************
********************************************************************************
********************************************************************************

cd "$menage_folder"

use NORC-IGA-Endline-Menage.dta, clear

*Check for duplicates. The output should read copies 1 and surplus 0.
duplicates report

*If there are more copies and surplus, you should run the following:
duplicates drop

*Keep track of how many duplicates are deleted. Then run count:
count

*Make sure that the count of unique interviews is the number that you expect.

*Convert timestamps variable into workable variable
destring duration_itw, replace
replace duration_itw=duration_itw/60

*Clean health area mislabeling
replace q9 = 155 if key == "uuid:b205c0b0-bbab-4b7d-99b0-36d2d69eecb9"


label variable duration_itw "Duration interview (minutes) - Total time spent in the interview on the tablet"

*Generate interview disposition variable 
foreach num of numlist 1/9 {
	gen int_dispos_`num' = 0 if a1 == 1
}

replace int_dispos_1 = 1 if a6 == 1 & q16 == 1
replace int_dispos_2 = 1 if a24 == 1 & q16 == 1
replace int_dispos_3 = 1 if q16 == 2
replace int_dispos_4 = 1 if a6_no == 1
replace int_dispos_5 = 1 if a24 == 2 | a24 == 3
replace int_dispos_6 = 1 if a4 == 2
replace int_dispos_7 = 1 if a7 == 1
replace int_dispos_8 = 1 if s1_15_2 == 2 | s1_15_2 == 3
replace int_dispos_9 = 1 if a2 == 1

label variable int_dispos_1 "Interviewed panel respondent"
label variable int_dispos_2 "Interviewed another respondent in panel HH"
label variable int_dispos_3 "Refusal of panel respondent at consent"
label variable int_dispos_4 "Refusal of panel respondent before consent"
label variable int_dispos_5 "Attempt: No eligible HH member avail."
label variable int_dispos_6 "Attempt: Cannot locate household"
label variable int_dispos_7 "Attempt: No one avail. or willing"
label variable int_dispos_8 "Partially completed interview"
label variable int_dispos_9 "Interviewed new respondent"

*Drop test observations
drop testlive
gen testlive = 0
replace testlive = 1 if key == "uuid:8801c5e7-9116-4e75-a10f-a412daa42d1d"
replace testlive = 1 if key == "uuid:31e41cd7-aa41-4fea-9d1c-8ec1600b7a40"
replace testlive = 1 if key == "uuid:e6383afb-855b-497a-8350-ed05daa3d90d"
replace testlive = 1 if key == "uuid:aeb3a16f-b23a-48d8-84af-c64e28ca3400"
replace testlive = 1 if key == "uuid:f942bb21-30d7-4849-8ac4-596124a23c64"
replace testlive = 1 if key == "uuid:53f907e1-6c48-408f-9e49-1ee8363a257f"
replace testlive = 1 if key == "uuid:dc655e84-d1df-45c2-8273-601c22631cb2"
replace testlive = 1 if key == "uuid:ff420320-5fd4-4ace-b9c5-2f749836da36"
replace testlive = 1 if key == "uuid:48f462b5-0e54-48f4-9bb4-36d11d4ca88d"
replace testlive = 1 if key == "uuid:c2577793-14fc-4d33-9c04-42fa470c68a2"
replace testlive = 1 if key == "uuid:8d517434-216c-4689-8671-9c9cdacf5cbf"
replace testlive = 1 if key == "uuid:52745840-c01d-4969-b1e3-6a2c3dd59933"
replace testlive = 1 if key == "uuid:8f84a076-5c4f-45e2-9086-560e162967dc"
replace testlive = 1 if key == "uuid:e6e5a687-bf64-44ee-acba-97b708e8ebd8"
replace testlive = 1 if key == "uuid:f139179e-f411-4e8d-b0d7-64b7cf85d491"
replace testlive = 1 if key == "uuid:c63ec3f7-03e1-4f4b-a677-e730b9ae11fc"
replace testlive = 1 if key == "uuid:10f1da23-9d84-4e97-a33c-96c52f919b51"
replace testlive = 1 if key == "uuid:e20b8e12-b904-4514-8b84-cc4838d8a632"
replace testlive = 1 if key == "uuid:57af2f94-033a-4491-9147-7ce1a40d7a1f"
replace testlive = 1 if key == "uuid:cc283200-afd3-4c98-892a-c7b13481be53"
replace testlive = 1 if key == "uuid:6a686aa9-5b88-4173-9f2d-9af5a8a0d7ad"
replace testlive = 1 if key == "uuid:be6ba3d7-ac8d-4978-a59b-7cea1a9c6c45"
replace testlive = 1 if key == "uuid:e317c369-4ea8-4204-93bc-af5fd862c968"
replace testlive = 1 if key == "uuid:45cff4a9-ff44-4926-9ac4-91387f297135"
replace testlive = 1 if key == "uuid:e10fed1b-ef13-4c59-9f30-b5eeca0c2a34"
replace testlive = 1 if key == "uuid:fd8fc6dd-74ee-4db2-af63-2a26b8017e01"
replace testlive = 1 if key == "uuid:132dfa0d-df9e-47d2-a652-c13c37413168"

drop if testlive == 1

save NORC-IGA-Endline-Menage_cleaned.dta, replace

********************************************************************************
********************************************************************************
********************************************************************************
*                               QUALITY CONTROL                                *
********************************************************************************
********************************************************************************
********************************************************************************

sleep 1000

cd "$menage_QC_folder"

use "$menage_folder/NORC-IGA-Endline-Menage_cleaned.dta", clear

*Keep all complete interviews with panel respondents and new HHs

keep if (int_dispos_1 == 1 | int_dispos_2 == 1 | int_dispos_9 == 1) & q16 == 1

*Remove enumerator label
label value q12 .

label variable duration_itw "Duration interview (minutes)"

/* Run QC over duration variables [using better time stamp]: 2SD, boxplots */
*duration_itw duration_conjoint duration_hhroster duration_vaccination duration_pregnant1 duration_pregnant2 duration_infant duration_hhhealth duration_family1 duration_family2 duration_codesa duration_civil duration_demo duration_itwer

summarize duration_itw if duration_itw < 450, detail
return list
dis r(mean) + (2*r(sd))
dis r(mean) + (-2*r(sd))

gen duration_itw_long = 0
gen duration_itw_short = 0
summarize duration_itw, detail
replace duration_itw_long = 1 if duration_itw > (r(mean) + (2*r(sd))) & duration_itw != . 
replace duration_itw_short = 1 if duration_itw < (r(mean) - (2*r(sd))) & duration_itw != . 

*count if `v'_short == 1
*local n_obs = r(N)
*if `n_obs' > 0{
*}

*Histogram
hist duration_itw if duration_itw < 450

*Box plot
graph box duration_itw if duration_itw < 450, title(Menage--duration_itw by Enumerator) ///
		ysize(15) xsize(20)

*Box plots by enumerator
graph box duration_itw if duration_itw < 450, title(Menage--duration_itw by Enumerator) ///
		over(q12, sort(q12) label(angle(90))) ///
		ysize(15) xsize(20)
graph export "menage_duration_itw_by_enumerator.png", as(png) replace

/*
graph box `v' if q7==2, title(Menage--`v' by Enumerator) ///
		over(q12, sort(1) label(angle(90))) ///
		ysize(1) ///
		ylabel(0(20)120)
graph export "menage_`v'_by_enumerator_HK.png", as(png) replace
*/
/*
*And box plots by team
graph box duration if , title(Menage--Duration itw by Team) ///
		over(team, sort(1) label(angle(90))) ///
		ysize(1) ///
		ylabel(0(20)120) 
*graph export "menage_duration_by_team.png", as(png) replace
*/


*tabout q12 duration_itw_short using Menage_duration_QC_$date.xls, c(freq row) replace
*tabout q12 duration_itw_long using Menage_duration_QC_$date.xls, c(freq row) append
tabout q7 using Menage_duration_summary.xls, sum oneway c(mean duration_itw median duration_itw) replace
tabout q12 using Menage_duration_summary.xls, sum oneway c(mean duration_itw median duration_itw) append


/* Export observations with short duration to their own Excel sheet */
count if duration_itw_short == 1
local n_obs = r(N)
if `n_obs' > 0{	
	display "Interviews shorter than expected"
	
	sort q9 q12 today_date
	export excel using "observations_duration_short.xlsx" ///
	if duration_itw_short == 1,firstrow(variables) replace
}

/*
*T-tests to understand influencers of short surveys
*Number of household members
ttest num_hh_members, by(duration_itw_short)

*Children under 5
ttest under5childrenresp, by(duration_itw_short)

*Vaccination card available
ttest q201_1, by(duration_itw_short)

*Pregnant woman
ttest q301 if q301 != -98, by(duration_itw_short)

*Woman given birth
ttest q319 if q319 != -98, by(duration_itw_short)

*Child who died younger than 28 days
ttest q400 if q400 != -98, by(duration_itw_short)

*Woman died during pregnancy
*ttest q419_1 if q419_1 != -98, by(duration_itw_short) 

*Woman died within two months after pregnancy
*ttest q420_1 if q420_1 != -98, by(duration_itw_short) 

*More than one HH member been ill in past two weeks
ttest q502 if q502 != -98, by(duration_itw_short)
*/

********************************************************************************
* Don't know
********************************************************************************
*Generate a variable to hold number of "Don't know" answers 
gen dk_total=0

/* Then add up all don't know responses from the survey. Don't know responses 
were marked with "-98" */
ds, has(type numeric)
foreach var of varlist `r(varlist)' {
  replace dk_total=dk_total+1 if `var'==-98
}

*Visualization: Box plots with number of don't know responses
gen twosd_dk_total = 0
summarize dk_total, detail
dis r(mean) + (2*r(sd))
hist dk_total
graph box dk_total
replace twosd_dk_total = 1 if dk_total > 2*r(sd) + r(mean) & dk_total != . 

label variable dk_total "Number of don't know responses"
*Visualization: Box plots with number of don't know responses by enumerator
graph box dk_total , title(Menage--Don't Know by Enumerator) ///
		over(q12, sort(q12) label(angle(90))) ///
		ysize(15) xsize(20)
graph export "menage_dk_by_enumerator.png", as(png) replace

/*
*Visualization: Box plots with number of don't know responses by team
graph box dk_total , title(Menage--Don't Know by Team) ///
		over(team, sort(1) label(angle(90))) ///
		ysize(1) ///
		ylabel(0(10)35)
*graph export "menage_dk_by_team.png", as(png) replace
*/

/* Export observations with unusually high number of don't know responses */
gen dk_many = 0
summarize dk_total, detail
replace dk_many = 1 if dk_total > (r(mean) + (2*r(sd)))
count if dk_many == 1
local n_obs = r(N)
if `n_obs' > 0{
	
	display "Interviews with high number of don't know responses"
	
	ds, has(type numeric)
	sort q9 q12 today_date
	export excel  using "observations_high_number_dk.xlsx" if dk_many == 1, ///
	firstrow(variables) replace
}


********************************************************************************
* Integer outliers
********************************************************************************
*Export outliers in main dataset
foreach var of varlist q222_* q311 q414 q510 q515_minutes q515_hours q526 q528 q919_*_num{
*capture confirm variable `var',exact
*if !_rc {
	quietly summarize `var' if `var' != -98
	gen int_`var' = 1 if `var' > 2*r(sd) + r(mean) & `var' != . 
	replace int_`var' = 1 if `var' < -2*r(sd) + r(mean) & `var' != -98
	count if int_`var' == 1 
	if r(N) > 0 {
		export excel key q12 `var' if int_`var' == 1 using ///
		"integer_outliers.xlsx" ///
		, sheet("`var'") firstrow(varlabels) sheetreplace
	else {
		putexcel set "integer_outliers.xlsx", sheet("`var'", replace) modify
		putexcel A1 = "No Outliers"
	}
}
}


*generate a variable which counts the number of integer outliers per observation
gen int_outlier_total = 0
foreach var of varlist int_q222_* int_q311 int_q414 int_q510 int_q515_minutes int_q515_hours int_q526 int_q528 int_q919_*_num {
	replace int_outlier_total = int_outlier_total + 1 if `var' == 1
	drop `var'
}

*Visualization: Box plots with number of integer outliers
gen twosd_int_outlier_total = 0
label variable int_outlier_total "Number of integer outliers"
summarize int_outlier_total, detail
dis 2*r(sd) + r(mean)
hist int_outlier_total
graph box int_outlier_total
replace twosd_int_outlier_total = 1 if int_outlier_total > 1 & int_outlier_total != . 

*Visualization: Box plots with number of integer outliers by enumerator
graph box int_outlier_total ///
		, title(Menage--Integer Outlier by Enumerator) ///
		over(q12, sort(q12) label(angle(90))) ///
		ysize(15) xsize(20)
graph export "menage_outlier_by_enumerator.png", as(png) replace


/* Export observations with unusually high number of integer outliers */
count if int_outlier_total > 1
local n_obs = r(N)
if `n_obs' > 0{
	
	display "Interviews with high number of potential outliers"
	
	ds, has(type numeric)
	sort q9 q12 today_date
export excel key q7 q8 q9 q6 q12 today_date int_outlier_total q101a q101b q222_* q311 q414 q510 q515_minutes q515_hours q526 q528 q919_*_num using "observations_high_number_outlier.xlsx" if int_outlier_total > 1, ///
	firstrow(variables) replace
}

/*
*Visualization: Box plots with number of integer outliers by team
graph box twosd_int_outlier_total if q11 !=2003 & q11 != 2004 & q11 != 2003 & q11 != 2006 & q11 != 2008 &  ///
	q11 != 2010 & q11 != 2021 & q11 != 2031 & q11 != 2047 & q11 != 2049 & q11 != 2056 ///
	 & q11 != 2057 & q11 != 1001 & q11 != 1002 & q11 != 1003 & q11 != 1004 & q11 != 2401 ///
	 & q11 != 5006 ///
	, title(Menage--Integer Outlier by Team) ///
		over(team, sort(1) label(angle(90))) ///
		ysize(1) ///
		ylabel(0(2)10)
*graph export "menage_outlier_by_team.png", as(png) replace
*/

********************************************************************************
* QC global
********************************************************************************
/* sum the binary variables together in order to get a count of the number of types
of observations that were incorrect */
egen qc_issues_total = rowtotal(duration_itw_short duration_itw_long dk_many twosd_int_outlier_total)

count if qc_issues_total > 1 
	if r(N) > 0 {
		export excel q7 q8 q9 q6 q12 hhid b_respondent_surname b_respondent_firstname duration_itw_short dk_many twosd_int_outlier_total qc_issues_total key if qc_issues_total > 1 using ///
		"observations_several_qc_issues.xlsx" ///
		, sheet("qc_issues_total") firstrow(varlabels) sheetreplace
	}

*restore
	
/*Export other responses*/
foreach var in a6_no_other a7_other a9_3 a14_other a23_other q220a_1 q220a_2 q220a_3 q220a_4 q223a_1 q223a_2 q223a_3 q223a_4 q223b_1 q223b_2 q223b_3 q223b_4 q307a q308a q309a q325a q326a q327a q337a q341a q342a q508_other q514_other q525_other q537_other q702_other q714k_a q714k_b q714k_c q913_other q915_other q916_other q918_other s1_15_2_other q1001_other q1002_c_other q1009_other {
	capture confirm variable `var' 
		if !_rc {
			count if `var' != ""
			if r(N) != 0 {
				export excel key q12 `var' if `var' != "" using ///
				"other_responses.xlsx" ///
				, sheet("`var'") firstrow(varlabels) sheetmodify
			}
			else {
				putexcel set "other_responses.xlsx", sheet("`var'", replace) modify
				putexcel A1 = ("No Other Responses")
			}
	}
}

/*Export outliers*/

********************************************************************************
* GPS verification
********************************************************************************
*Code for checking GPS points for Clusters
***************************************************

use "$menage_folder/NORC-IGA-Endline-Menage_cleaned.dta", clear

keep if int_dispos_1 == 1 | int_dispos_2 == 1 | int_dispos_9 == 1

* Generate centroid for each health area
levelsof q9, local(levels)

* Create variable for each obs that calculates distance of observation from centroid 
foreach n of numlist `levels' {

	sum q5latitude if q9==`n'
	gen cent_lat`n' = r(mean)
		
	sum q5longitude if q9==`n'
	gen cent_long`n' = r(mean)

	globdist check_dist`n' if q9==`n' , lat0(cent_lat`n') lon0(cent_long`n') ///
		latvar(q5latitude) lonvar(q5longitude) 
		
}

* Show average distance of observation from centroid 
foreach n of numlist `levels' {

	sum check_dist`n' if q9==`n'		

}

* Export GPS coordinates for QGIS
export delimited key today_date q7 q7_1 q8 q9 q6 q12 hhid b_respondent_surname b_respondent_firstname duration_itw q5latitude q5longitude ///
	using "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\8_MAPS.ME\menage.csv", replace


* Compare distance between interviews with same respondent	
replace hhid = regexs(1) if regexm(hhid, ("(^[0-9][0-9]+)"))
duplicates tag hhid, gen(dup)
count if dup > 0 
if r(N) != 0 {
	export excel today_date q7 q7_1 q8 q9 q10 q6 q12 b_respondent_surname_firstname b_resp_gender b_resp_age q101a q101b q103 q104 phone_number hhid key duration_itw if dup > 0 ///
	using "dup_hhid.xlsx", sheet("duplicates") sheetreplace firstrow(variables)
}
else {
	putexcel set "dup_hhid.xlsx"
	putexcel A1 = "No duplicates"
}
drop if dup > 0
save "$menage_folder/NORC-IGA-Endline-Menage_formerge.dta", replace

use "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\4_Tools\HH\Preloads\el_menage.dta", clear 
destring panelgps_latitude panelgps_longitude, replace

* Merge
merge 1:1 hhid using "$menage_folder/NORC-IGA-Endline-Menage_formerge.dta"
keep if _merge == 3

* Calculate distance between baseline and midline
globdist check_dist, lat0(panelgps_latitude) lon0(panelgps_longitude) latvar(q5latitude) lonvar(q5longitude) 
replace check_dist = check_dist * 1000

*Create thresholds 
foreach num of numlist 30 60 90 120 150 180 210 { 
	gen gt`num' = 0 
	replace gt`num' = 1 if check_dist > `num'
}

sort check_dist

* Export
preserve
collapse check_dist gt30 gt60 gt90 gt120 gt150 gt180 gt210, by(q12)
export excel using "check_dist_HH.xlsx", sheet("enumerator") sheetmodify  firstrow(variables) nolabel
restore

preserve
collapse check_dist gt30 gt60 gt90 gt120 gt150 gt180 gt210, by(q9)
export excel using "check_dist_HH.xlsx", sheet("health area") sheetmodify firstrow(variables) 
restore

preserve
collapse check_dist gt30 gt60 gt90 gt120 gt150 gt180 gt210, by(q8)
export excel using "check_dist_HH.xlsx", sheet("health zone") sheetmodify firstrow(variables) 
restore

preserve
collapse check_dist gt30 gt60 gt90 gt120 gt150 gt180 gt210, by(q7)
export excel using "check_dist_HH.xlsx", sheet("province") sheetmodify firstrow(variables) 
restore

export excel today_date key q7 q7_1 q8 q9 q10 q12 b_respondent_surname b_respondent_firstname panelresp_phone b_resp_gender b_resp_age q101a q101b phone_number q103 q104 check_dist q1010 if check_dist > 250 ///
using "check_dist_HH.xlsx", sheet("outliers") sheetmodify firstrow(variables)


/*
********************************************************************************
* Number of integers that are multiples of 10
********************************************************************************

preserve

*Export rounded values in main dataset
foreach var of varlist q222_* q311 q414 q510 q515_minutes q515_hours q526 q528 q919_*_num{
gen round_`var' = 1 if ((int(`var'/10)*10) == `var') & `var' != .
}

gen round_total = 0
foreach var of varlist q222_* q311 q414 q510 q515_minutes q515_hours q526 q528 q919_*_num{
replace round_total = round_total + 1 if round_`var' == 1
drop round_`var'
}

*Visualization: outlier
gen twosd_round_total = 0
summarize round_total, detail
dis 2*r(sd) + r(mean)
replace twosd_round_total = 1 if round_total > 2*r(sd) + r(mean) & round_total != .

restore
*/



********************************************************************************
* Enumerator comment variable
********************************************************************************
preserve

cd "$menage_folder"

use NORC-IGA-Endline-Menage.dta, clear

sort q9 q12 today_date

export excel key q7 q8 q9 q6 q12 today_date q1010 using "enumerator_comment_phase.xlsx", firstrow(variables) replace

restore

********************************************************************************
* Interview disposition
********************************************************************************

cd "$menage_folder"

use NORC-IGA-Endline-Menage_cleaned.dta, clear

*Create dataset with interview dispositions by HHID

*Generate index
bysort hhid: gen submissions = _n if a1 == 1

*Generate last known location attempt dummy
destring resp_dist_bw, replace

gen loc_attempt = 0 if a1 == 1
replace loc_attempt = 1 if resp_dist_bw < 50 & a1 == 1

collapse (last) q12 (sum) int_dispos_1 int_dispos_2 int_dispos_3 int_dispos_4 int_dispos_5 ///
	int_dispos_6 int_dispos_7 int_dispos_8 int_dispos_9 loc_attempt ///
	(max) submissions if a1 == 1, by(hhid) 

label variable int_dispos_1 "Interviewed panel respondent"
label variable int_dispos_2 "Interviewed another respondent in panel HH"
label variable int_dispos_3 "Refusal of panel respondent at consent"
label variable int_dispos_4 "Refusal of panel respondent before consent"
label variable int_dispos_5 "Attempt: No eligible HH member avail."
label variable int_dispos_6 "Attempt: Cannot locate household"
label variable int_dispos_7 "Attempt: No one avail. or willing"
label variable int_dispos_8 "Partially completed interview"
label variable int_dispos_9 "Interviewed new respondent"
label variable loc_attempt "Number of attempts near last known loc"
label variable submissions "Number of submissions"
label variable q12 "Enumerator"
gen hhid_improved = hhid

replace hhid = regexs(1) if regexm(hhid, ("(^[0-9][0-9]+)"))

save "menage_int_dispos_data.dta", replace


*Create template with the IDs and names of all panel respondents to be reached
import delimited "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\4_Tools\HH\Icons_and_CSV\el_menage.csv", clear 

tostring hhid, replace

merge 1:1 hhid using "menage_int_dispos_data.dta"
drop _merge

*Anonymize
drop hhid_improved panelresp_surname panelresp_firstname panelresp_gender panelresp_age panelresp_phone panelhead_surname panelhead_firstname panelhead_gender panelhead_age panelgps_latitude panelgps_longitude

cd "$tracking_folder"

export excel using "Respondent_Tracker.xlsx", firstrow(varlabels) replace


********************************************************************************
* Respondent Matching
********************************************************************************

cd "$menage_folder"

use NORC-IGA-Endline-Menage_cleaned.dta, clear

gen hhid_improved = hhid

replace hhid = regexs(1) if regexm(hhid, ("(^[0-9][0-9]+)"))

merge m:1 hhid using "G:\My Drive\DRC_Projects\NORC - IGA Endline (1396)\4_Tools\HH\Preloads\el_menage.dta", keepusing(panelresp_surname panelresp_firstname panelresp_gender panelresp_age panelhead_surname panelhead_firstname panelhead_gender panelhead_age)

keep if _merge == 3

* Name matching in respondent tracking module
replace a25 = 2 if key == "uuid:53f907e1-6c48-408f-9e49-1ee8363a257f"
replace a25_fix = "Mwamini" if key == "uuid:53f907e1-6c48-408f-9e49-1ee8363a257f"

matchit a25_fix panelresp_surname 
list a25_fix panelresp_surname similscore if a25 == 2
drop similscore

matchit a25_fix panelresp_firstname 
list a25_fix panelresp_firstname similscore if a25 == 2
drop similscore

matchit a25_fix panelhead_surname 
list a25_fix panelhead_surname similscore if a25 == 2
drop similscore

matchit a25_fix panelhead_firstname 
list a25_fix panelhead_firstname similscore if a25 == 2
drop similscore

* Gender matching
gen gender_mismatch = 0 if a27 == 2
replace gender_mismatch = 1 if a27_fix == 1 & panelresp_gender == "Female"
replace gender_mismatch = 1 if a27_fix == 2 & panelresp_gender == "Male"

* Age matching
destring panelresp_age panelhead_age, replace
gen age_mismatch = 0 if a28 == 2 
replace age_mismatch = 1 if abs(a28_fix - panelresp_age) >= 2 & a28 == 2

* Name matching in respondent
** Compare first name of respondent and first name of panel respondent
matchit q101b panelresp_firstname
list q101b panelresp_firstname
drop similscore

** Compare last name of respondent and last name of panel respondent
matchit q101a panelresp_surname
list q101b panelresp_firstname
drop similscore



********************************************************************************
* Tracking
********************************************************************************

*Load the dataset
cd "$menage_folder"

use NORC-IGA-Endline-Menage_cleaned.dta, clear

*First, change the directory to the tracking folder
cd "$tracking_folder"

*Create temporary numeric unique identifier

gen num_panel= .
replace num_panel = 1 if int_dispos_1 == 1 | int_dispos_2 == 1

gen num_new = .
replace num_new = 1 if int_dispos_9 == 1

*Collapse to get a count by the location variable
collapse (count) num_panel num_new (sum) int_dispos_1 int_dispos_2 int_dispos_3 int_dispos_4 int_dispos_5 ///
	int_dispos_6 int_dispos_7 int_dispos_8, by(q9)
	
label variable num_panel "Interviewed panel or HH respondent"
label variable num_new "Interviewed new respondent"
label variable int_dispos_1 "Interviewed panel respondent"
label variable int_dispos_2 "Interviewed another respondent in panel HH"
label variable int_dispos_3 "Refusal of panel respondent at consent"
label variable int_dispos_4 "Refusal of panel respondent before consent"
label variable int_dispos_5 "Attempt: No eligible HH member avail."
label variable int_dispos_6 "Attempt: Cannot locate household"
label variable int_dispos_7 "Attempt: No one avail. or willing"
label variable int_dispos_8 "Partially completed interview"

*Export the contents of the collapsed dataset into an Excel sheet
export excel using "Progress_Tracker.xlsx", ///
	sheet("Menage data") sheetreplace firstrow(varlabels)
