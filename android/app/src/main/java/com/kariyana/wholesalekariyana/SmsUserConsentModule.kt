package com.kariyana.wholesalekariyana

import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.auth.api.phone.SmsRetriever
import com.google.android.gms.common.api.CommonStatusCodes
import com.google.android.gms.common.api.Status

class SmsUserConsentModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  private var receiver: BroadcastReceiver? = null
  private var receiverRegistered = false
  private var lastOtp: String? = null
  private var lastMessage: String? = null

  private val activityEventListener: ActivityEventListener =
    object : BaseActivityEventListener() {
      override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
      ) {
        if (requestCode != SMS_CONSENT_REQUEST) return

        if (resultCode == Activity.RESULT_OK && data != null) {
          val message = data.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE).orEmpty()
          val otp = OTP_REGEX.find(message)?.value

          lastMessage = message
          lastOtp = otp

          emitOtpEvent(message, otp, if (otp == null) "OTP_NOT_FOUND" else "SUCCESS")
        } else {
          emitOtpEvent(null, null, "CONSENT_DENIED")
        }
      }
    }

  init {
    reactContext.addActivityEventListener(activityEventListener)
  }

  override fun getName(): String = "SmsUserConsent"

  @ReactMethod
  fun startListening(senderAddress: String?, promise: Promise) {
    try {
      registerReceiver()

      val sender = senderAddress?.takeIf { it.isNotBlank() }
      SmsRetriever
        .getClient(reactContext)
        .startSmsUserConsent(sender)
        .addOnSuccessListener { promise.resolve(true) }
        .addOnFailureListener { error ->
          promise.reject("SMS_CONSENT_START_FAILED", error.message, error)
        }
    } catch (error: Exception) {
      promise.reject("SMS_CONSENT_START_FAILED", error.message, error)
    }
  }

  @ReactMethod
  fun stopListening(promise: Promise) {
    try {
      unregisterReceiver()
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject("SMS_CONSENT_STOP_FAILED", error.message, error)
    }
  }

  @ReactMethod
  fun getLastOtp(promise: Promise) {
    val payload = Arguments.createMap()
    payload.putString("otp", lastOtp)
    payload.putString("message", lastMessage)
    promise.resolve(payload)
  }

  @ReactMethod
  fun clearLastOtp(promise: Promise) {
    lastOtp = null
    lastMessage = null
    promise.resolve(true)
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Required by NativeEventEmitter.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Required by NativeEventEmitter.
  }

  private fun registerReceiver() {
    if (receiverRegistered) return

    receiver = object : BroadcastReceiver() {
      override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action != SmsRetriever.SMS_RETRIEVED_ACTION) return

        val status = intent.getParcelableExtraCompat<Status>(SmsRetriever.EXTRA_STATUS)

        when (status?.statusCode) {
          CommonStatusCodes.SUCCESS -> {
            val consentIntent =
              intent.getParcelableExtraCompat<Intent>(SmsRetriever.EXTRA_CONSENT_INTENT)

            try {
              if (consentIntent == null) {
                emitOtpEvent(null, null, "NO_CONSENT_INTENT")
                return
              }

              reactContext.currentActivity?.startActivityForResult(
                consentIntent,
                SMS_CONSENT_REQUEST
              ) ?: emitOtpEvent(null, null, "NO_ACTIVITY")
            } catch (error: Exception) {
              emitOtpEvent(null, null, "CONSENT_LAUNCH_FAILED")
            }
          }

          CommonStatusCodes.TIMEOUT -> emitOtpEvent(null, null, "TIMEOUT")
        }
      }
    }

    val filter = IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      reactContext.registerReceiver(
        receiver ?: return,
        filter,
        SmsRetriever.SEND_PERMISSION,
        null,
        Context.RECEIVER_EXPORTED
      )
    } else {
      reactContext.registerReceiver(
        receiver ?: return,
        filter,
        SmsRetriever.SEND_PERMISSION,
        null
      )
    }

    receiverRegistered = true
  }

  private fun unregisterReceiver() {
    if (!receiverRegistered || receiver == null) return

    reactContext.unregisterReceiver(receiver)
    receiver = null
    receiverRegistered = false
  }

  private fun emitOtpEvent(message: String?, otp: String?, status: String) {
    val payload = Arguments.createMap()
    payload.putString("message", message)
    payload.putString("otp", otp)
    payload.putString("status", status)

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("SmsUserConsent:onOtp", payload)
  }

  override fun invalidate() {
    unregisterReceiver()
    reactContext.removeActivityEventListener(activityEventListener)
    super.invalidate()
  }

  private inline fun <reified T> Intent.getParcelableExtraCompat(name: String): T? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      getParcelableExtra(name, T::class.java)
    } else {
      @Suppress("DEPRECATION")
      getParcelableExtra(name) as? T
    }
  }

  companion object {
    private const val SMS_CONSENT_REQUEST = 8634
    private val OTP_REGEX = Regex("\\b\\d{6}\\b")
  }
}
