  const handleSave = async () => {
    if (!user?.uid) {
      alert("Sesi login tidak ditemukan. Silakan login kembali.");
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "typing_sessions"), {
        userId: user.uid,
        metrics,
        rawLogs: logs.current,
        analysis,
        timestamp: serverTimestamp(),
      });

      alert(t("saveSuccess") || "Data berhasil disimpan!");
      router.refresh(); // Membersihkan cache agar data terbaru masuk
      router.push("/history"); // Navigasi ke halaman riwayat
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const analysis = analyzeMentalState(metrics);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-900 border-slate-800 text-white">
          <p className="text-xs text-slate-400">{t("typingSpeed")}</p>
          <p className="text-xl font-bold">{metrics.wpm} WPM</p>
        </Card>
