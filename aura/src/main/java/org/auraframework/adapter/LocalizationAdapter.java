/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * Copyright, 1999-2011, salesforce.com All Rights Reserved Company Confidential
 */
package org.auraframework.adapter;

import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import org.auraframework.util.AuraLocale;

/**
 * Provides access to AuraLocale instances and enables a custom label adapter implementation.
 */
public interface LocalizationAdapter extends AuraAdapter {

    /**
     * Returns the specified label. 
     * @param section 
     *      The section in the label definition file where the label is defined. 
     *      This assumes your label name has two parts (section.name). 
     *      This parameter can be <code>null</code> depending on your label system implementation.
     * @param name
     *      The label name.
     * @param params
     *      A list of parameter values for substitution on the server. 
     *      This parameter can be <code>null</code> if parameter substitution is done on the client.
     * @return
     */
    String getLabel(String section, String name, Object... params);

    /**
     * Indicates whether the specified label is defined or not.
     * @param section
     *      The section in the label definition file where the label is defined. 
     *      This assumes your label name has two parts (section.name). 
     *      This parameter can be <code>null</code> depending on your label system implementation.
     * @param name
     *      The label name.
     * @return True if the specified label is defined; otherwise, false.
     */
    boolean labelExists(String section, String name);

}
