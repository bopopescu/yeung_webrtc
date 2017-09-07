// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file has been auto-generated by code_generator_v8.py.
// DO NOT MODIFY!

// This file has been generated from the Jinja2 template in
// third_party/WebKit/Source/bindings/templates/dictionary_impl.cpp.tmpl

// clang-format off
#include "TestInterfaceEventInit.h"

namespace blink {

TestInterfaceEventInit::TestInterfaceEventInit() {
}

TestInterfaceEventInit::~TestInterfaceEventInit() {}

TestInterfaceEventInit::TestInterfaceEventInit(const TestInterfaceEventInit&) = default;

TestInterfaceEventInit& TestInterfaceEventInit::operator=(const TestInterfaceEventInit&) = default;

bool TestInterfaceEventInit::hasStringMember() const {
  return !m_stringMember.IsNull();
}
const String& TestInterfaceEventInit::stringMember() const {
  return m_stringMember;
}
void TestInterfaceEventInit::setStringMember(const String& value) {
  m_stringMember = value;
}

DEFINE_TRACE(TestInterfaceEventInit) {
  EventInit::Trace(visitor);
}

}  // namespace blink